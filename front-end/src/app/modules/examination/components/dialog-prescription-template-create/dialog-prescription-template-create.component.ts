import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Item} from "../../../pharmacy/components/dialog-export-voucher-create/dialog-export-voucher-create.component";
import {map, Observable, startWith} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ItemService} from "../../../pharmacy/services/item.service";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PrescriptionTemplateService} from "../../service/prescription-template.service";

@Component({
  selector: 'app-dialog-prescription-template-create',
  templateUrl: './dialog-prescription-template-create.component.html',
  styleUrl: './dialog-prescription-template-create.component.css'
})
export class DialogPrescriptionTemplateCreateComponent {
  reactiveForm: FormGroup;
  hideFields: boolean = false;
  items: Item[] = [];
  item: FormControl = new FormControl();
  filteredItem: Observable<Item[]>;

  constructor(private fb: FormBuilder,
              private storage: AngularFireStorage,
              private itemService: ItemService,
              private templateService: PrescriptionTemplateService,
              private tokenStorageService: TokenStorageService,
              private _snackBar: MatSnackBar,
  ) {
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
      description: [],
      details: this.fb.array([]),
    });
  }

  get details(): FormArray {
    return this.reactiveForm.get('details') as FormArray;
  }

  addItem(item: any) {
    const newItem = this.fb.group({
      barcode: item.barcode,
      itemId: item.itemId,
      name: item.medicineName,
      unit: item.unit,
      description: [],
      morning: [],
      lunch: [],
      afternoon: [],
      night: [],
      days: [],
    });

    (this.reactiveForm.get('details') as FormArray).push(newItem);
  }

  removeItem(index: number) {
    (this.reactiveForm.get('details') as FormArray).removeAt(index);

    this.openSnackBar('Đã xóa sản phẩm khỏi đơn mẫu!')
  }

  changeItem() {
    const selected = this.reactiveForm.get('item')?.value

    if (this.items.includes(selected)) {
      this.addItem(selected);
      this.reactiveForm.get('item')?.setValue('')
      this.openSnackBar('Đã thêm sản phẩm vào đơn mẫu!')
    }
  }

  scanItem() {
    const scanBarcode = this.reactiveForm.get('scanBarcode')?.value
    let foundMedicine = this.items.find(item => item.barcode === scanBarcode);

    if (foundMedicine) {
      this.addItem(foundMedicine);
      this.reactiveForm.get('scanBarcode')?.reset()
      this.openSnackBar('Đã thêm sản phẩm vào đơn mẫu!')
    } else {
      this.openSnackBar('Mã sản phẩm không tồn tại!')
      this.reactiveForm.get('scanBarcode')?.reset()
    }
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

  submitForm() {
    debugger
    const form = this.reactiveForm.value

    this.templateService.saveTemplate(form).subscribe({
      complete: () => this.openSnackBar('Thao tác thành công'),
      error: err => this.openSnackBar(`Lỗi: ${err.status}`)
    })
  }

}
