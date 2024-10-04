import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Item} from "../dialog-export-voucher-create/dialog-export-voucher-create.component";
import {ItemService} from "../../services/item.service";
import {TokenStorageService} from "../../../login/services/token-storage.service";

@Component({
  selector: 'app-dialog-import-voucher-create',
  templateUrl: './dialog-import-voucher-create.component.html',
  styleUrl: './dialog-import-voucher-create.component.css'
})
export class DialogImportVoucherCreateComponent {
  reactiveForm: FormGroup;
  hideFields: boolean = false;
  items: Item[] = [];
  item: FormControl = new FormControl();
  filteredItem: Observable<Item[]>;
  decryptedName: string;

  constructor(private fb: FormBuilder,
              private storage: AngularFireStorage,
              private itemService: ItemService,
              private tokenStorageService: TokenStorageService,
              private _snackBar: MatSnackBar,
  ) {
    this.getName();

    this.itemService.getItems().subscribe({
      next: value => {
        this.items = value;
        this.filteredItem = this.item?.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.medicineName),
            map(name => name ? this._filterItem(name) : this.items.slice())
          );
      }
    })
    this.reactiveForm = this.fb.group({
      item: this.item,
      scanBarcode: [],
      details: this.fb.array([]),
      createDate: [this.today(), Validators.required],
      createdBy: [this.decryptedName, Validators.required],
      vendor: ['', Validators.required],
      description: [],
      total: [0, [Validators.required]],
      vat: [8],
      totalAmount: [0, [Validators.required]],
    });
  }

  get details(): FormArray {
    return this.reactiveForm.get('details') as FormArray;
  }

  addItem(item: any) {
    const newItem = this.fb.group({
      itemId: item.itemId,
      barcode: item.barcode,
      medicineName: item.medicineName,
      unit: item.unit,
      expiryDate: [this.today(), Validators.required],
      unitPrice: 0,
      quantity: 0,
    });

    (this.reactiveForm.get('details') as FormArray).push(newItem);

    this.calculateAmount();
  }

  removeItem(index: number) {
    (this.reactiveForm.get('details') as FormArray).removeAt(index);

    this.calculateAmount();
    this.openSnackBar('Đã xóa sản phẩm khỏi đơn hàng!')
  }

  changeItem() {
    const selected = this.reactiveForm.get('item')?.value

    if (this.items.includes(selected)) {
      this.addItem(selected);
      this.reactiveForm.get('item')?.setValue('')
      this.openSnackBar('Đã thêm sản phẩm vào đơn hàng!')
    }
  }

  scanItem() {
    const scanBarcode = this.reactiveForm.get('scanBarcode')?.value
    let foundMedicine = this.items.find(item => item.barcode === scanBarcode);

    if (foundMedicine) {
      this.addItem(foundMedicine);
      this.reactiveForm.get('scanBarcode')?.reset()
      this.openSnackBar('Đã thêm sản phẩm vào đơn hàng!')
    } else {
      this.openSnackBar('Mã sản phẩm không tồn tại!')
      this.reactiveForm.get('scanBarcode')?.reset()
    }
  }

  calculateAmount() {
    const details = this.details.value;
    this.reactiveForm.get('total')?.setValue(
      details.reduce((total: number, item: any) => {
        return total + (item.quantity * item.unitPrice);
      }, 0)
    );

    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    debugger
    const total = this.reactiveForm.get('total')?.value;
    const vat = this.reactiveForm.get('vat')?.value;
    this.reactiveForm.get('totalAmount')?.setValue(
      total * (1 + vat / 100)
    );
  }

  displayItem(item: Item) {
    return item && item.medicineName ? item.medicineName : '';
  }

  private _filterItem(name: string): Item[] {
    const filterValue = name.toLowerCase();

    return this.items.filter(option => {
      return (option.medicineName ?? '').toLowerCase().indexOf(filterValue) === 0;
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Đóng', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }

  today() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Thêm '0' phía trước nếu cần
    const day = String(today.getDate()).padStart(2, '0'); // Thêm '0' phía trước nếu cần

    return `${year}-${month}-${day}`;
  }

  formatDate(inputDateStr: string): string {
    const date = new Date(inputDateStr);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getName() {
    if (this.tokenStorageService.getToken()) {
      this.decryptedName = this.tokenStorageService.getDecryptedName();
    }
  }

  submitForm() {
    const form = this.reactiveForm.value
    form.createDate = this.formatDate(form.createDate)

    this.itemService.import(form).subscribe({
      complete: () => this.openSnackBar('Thao tác thành công'),
      error: err => this.openSnackBar(`Lỗi: ${err.status}`)
    })
  }

}
