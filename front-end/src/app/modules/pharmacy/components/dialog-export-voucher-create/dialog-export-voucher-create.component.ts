import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map, Observable, startWith} from "rxjs";
import {Patient} from "../../../patient/models/patient";
import {PatientService} from "../../../patient/patient.service";
import {ItemService} from "../../services/item.service";
import {InventoryDtoExport} from "../../models/item";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {Router} from "@angular/router";

export interface Item {
  barcode?: string,
  medicineName?: string,
  activeIngredient?: string,
}

@Component({
  selector: 'app-dialog-export-voucher-create',
  templateUrl: './dialog-export-voucher-create.component.html',
  styleUrl: './dialog-export-voucher-create.component.css'
})
export class DialogExportVoucherCreateComponent {
  reactiveForm: FormGroup;
  hideFields: boolean = false;
  items: InventoryDtoExport[] = []
  item: FormControl = new FormControl();
  filteredItem: Observable<Item[]>;
  patient: FormControl = new FormControl();
  patients: Patient[] = [];
  filteredPatient!: Observable<Patient[]>;
  patientIsValid = false;
  qtyIsValid = true;
  decryptedName: string;

  constructor(private fb: FormBuilder,
              private storage: AngularFireStorage,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private patientService: PatientService,
              private itemService: ItemService,
              private _snackBar: MatSnackBar,
  ) {
    this.getName();

    this.reactiveForm = this.fb.group({
      item: this.item,
      scanBarcode: [],
      details: this.fb.array([]),
      createdBy: [this.decryptedName, Validators.required],
      patient: this.patient,
      patientId: [],
      type: ['retail'],
      description: [],
      payment: ['cash'],
      total: ['', [Validators.required]],
      surcharge: [],
      totalAmount: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getAllPatient();
    await this.getInventory();

    this.filteredItem = this.item?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.medicineName),
        map(name => name ? this._filterItem(name) : this.items.slice())
      );

    this.filteredPatient = this.patient.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.patientName),
        map(name => name ? this._filterPatient(name) : this.patients.slice())
      );
  }

  get details(): FormArray {
    return this.reactiveForm.get('details') as FormArray;
  }

  addMedicine(item: any) {
    const typeVoucher = this.reactiveForm.get('type')?.value;

    const newItem = this.fb.group({
      itemId: item.itemId,
      barcode: item.barcode,
      medicineName: item.medicineName,
      unit: item.unit,
      remainingQty: item.totalRemainingQuantity,
      unitPrice: typeVoucher === 'retail' ? item.retailPrice : item.priceWithService,
      quantity: item.quantity,
    });

    (this.reactiveForm.get('details') as FormArray).push(newItem);

    this.calculateAmount();
  }

  removeMedicine(index: number) {
    (this.reactiveForm.get('details') as FormArray).removeAt(index);

    this.calculateAmount();
    this.openSnackBar('Đã xóa sản phẩm khỏi đơn hàng!')
  }

  changeMedicine() {
    if (this.qtyIsValid) {
      const selected = this.reactiveForm.get('item')?.value

      if (this.items.includes(selected)) {
        this.addMedicine(selected);
        this.reactiveForm.get('item')?.setValue('')
        this.openSnackBar('Đã thêm sản phẩm vào đơn hàng!')
      }
    }
  }

  scanItem() {
    if (this.qtyIsValid) {
      const scanBarcode = this.reactiveForm.get('scanBarcode')?.value
      let foundMedicine = this.items.find(medicine => medicine.barcode === scanBarcode);

      if (foundMedicine) {
        this.addMedicine(foundMedicine);
        this.reactiveForm.get('scanBarcode')?.reset()
        this.openSnackBar('Đã thêm sản phẩm vào đơn hàng!')
      } else {
        this.openSnackBar('Mã sản phẩm không tồn tại!')
        this.reactiveForm.get('scanBarcode')?.reset()
      }
    }
  }

  calculateAmount() {
    const details = this.details.value;
    const totalAmount = details.reduce((total: number, item: any) => {
      if (item.quantity > item.remainingQty) {
        this.openSnackBar(`Số lượng của "${item.medicineName}" vượt quá tồn kho!`);
        this.qtyIsValid = false;
        return total;
      }
      this.qtyIsValid = true;
      return total + (item.quantity * item.unitPrice);
    }, 0);

    this.reactiveForm.get('total')?.setValue(totalAmount);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    debugger
    const total = this.reactiveForm.get('total')?.value;
    const surcharge = this.reactiveForm.get('surcharge')?.value;
    this.reactiveForm.get('totalAmount')?.setValue(
      total + surcharge
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Đóng', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }

  async getInventory() {
    try {
      this.itemService.getItemForExport().subscribe(data => {
        this.items = data;
      });
    } catch (e) {
      this.openSnackBar('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + e);
    }
  }

  displayItem(item: Item) {
    return item && item.medicineName ? item.medicineName : '';
  }

  private _filterItem(name: string): Item[] {
    const filterValue = name.toLowerCase();

    return this.items.filter(option => {
      return (option.activeIngredient ?? '').toLowerCase().indexOf(filterValue) === 0;
    });
  }

  async getAllPatient() {
    try {
      this.patientService.getPatients().subscribe(data => {
        this.patients = data;
      });
    } catch (e) {
      this.openSnackBar('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + e);
    }
  }

  displayPatient(patient: Patient): string {
    return patient && patient.patientName ? patient.patientName : '';
  }

  private _filterPatient(name: string): Patient[] {
    const filterValue = name.toLowerCase();

    return this.patients.filter(
      (option): option is Patient => typeof option?.phone === 'string' && option.phone.toLowerCase().indexOf(filterValue) === 0
    );
  }

  changePatient() {
    this.patient.valueChanges.subscribe(selected => {
      let foundSelected = this.patients.find(item => item === selected);

      if (foundSelected) {
        this.openSnackBar('Đã chọn khách hàng!')
        this.patientIsValid = true
      } else {
        this.openSnackBar('Khách hàng không tồn tại!')
        this.patientIsValid = false
      }
    });
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
    debugger
    const form = this.reactiveForm.value;
    form.createDate = this.formatDate(form.createDate);
    form.patientId = form.patient.patientId;

    this.itemService.export(form).subscribe({
      complete: () => {
        this.openSnackBar('Thao tác thành công')
        this.router.navigateByUrl('/production/pharmacist/export-list');
      } ,
      error: err => this.openSnackBar(`Lỗi: ${err.status}`)
    })
  }

}
