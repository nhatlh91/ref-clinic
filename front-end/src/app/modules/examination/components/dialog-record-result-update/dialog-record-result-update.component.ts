import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../models/service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Prescription, PrescriptionTemplate, RecordResult, RecordResultDetail} from "../../models/record-result";
import {RegistrationService} from "../../service/registration.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RecordResultService} from "../../service/record-result.service";
import {Item} from "../../../pharmacy/components/dialog-export-voucher-create/dialog-export-voucher-create.component";
import {map, Observable, startWith} from "rxjs";
import {ItemService} from "../../../pharmacy/services/item.service";
import {PrescriptionTemplateService} from "../../service/prescription-template.service";
import {EmployeeService} from "../../../employee/services/employee.service";
import {UserDto} from "../../../employee/components/models/user-dto";
import {InventoryDto, InventoryDtoExport} from "../../../pharmacy/models/item";
import {TokenStorageService} from "../../../login/services/token-storage.service";

@Component({
  selector: 'app-dialog-record-result-update',
  templateUrl: './dialog-record-result-update.component.html',
  styleUrl: './dialog-record-result-update.component.css'
})
export class DialogRecordResultUpdateComponent implements OnInit {
  reactiveForm!: FormGroup;
  identity = "";
  gender = "";
  birthDay = "";
  phone = "";
  address = "";
  services: Service[] = [];
  files: File[][] = [[]];
  selectedServices: FormControl = new FormControl('');
  item: FormControl = new FormControl('');
  items: InventoryDtoExport[] = [];
  filteredItem: Observable<Item[]>;
  prescriptions: Prescription[] = [];
  prescriptionTemplates: PrescriptionTemplate[] = [];
  role = 'ADMIN';
  check = false;
  switchValue: string = 'temp';
  accessJson: any

  constructor(private fb: FormBuilder,
              private storage: AngularFireStorage,
              private itemService: ItemService,
              private recordResultService: RecordResultService,
              private templateService: PrescriptionTemplateService,
              private registrationService: RegistrationService,
              private tokenStorageService: TokenStorageService,
              private employeeService: EmployeeService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: RecordResult,
  ) {
    console.table(this.data);
    this.recordResultService.getPrescription(this.data.recordResultId).subscribe({
      next: value => {
        this.data.prescriptions = value
        this.prescriptions = value
      }
    })

    this.recordResultService.getDetails(this.data.recordResultId).subscribe({
      next: value => {
        this.data.details = value
        this.data.details.forEach(service => {
          this.addService(service);
        });
      }
    });

    this.itemService.getItemForExport().subscribe({
      next: value => this.items = value
    })

    this.reactiveForm = this.fb.group({
      details: this.fb.array([]),
      prescriptions: this.fb.array([]),
      recordResultId: [data.recordResultId],
      createDate: [data.createDate],
      registrationId: [data.registrationId],
      patientId: [data.patientId],
      patientName: [data.patientName],
      patientIdentity: [data.patientIdentity],
      current: [data.current],
      history: [data.history],
      diagnose: [data.diagnose],
      addServicesForm: this.fb.group({
        selectedServices: this.selectedServices,
      }),
      prescriptionForm: this.fb.group({
        item: this.item,
        template: [],
        switch: ["temp"],
        itemId: [''],
        name: [''],
        unit: [''],
        description: [''],
        morning: [],
        lunch: [],
        afternoon: [],
        night: [],
        days: [],
      }),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getAllServices();
    await this.getAllTemplate();
    this.getUserInfo();

    this.filteredItem = this.item?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.medicineName),
        map(name => name ? this._filterItem(name) : this.items.slice())
      );
  }

  /**
   * Services
   */
  async getAllServices() {
    try {
      this.registrationService.getServices().subscribe({
        next: value => {
          this.services = value;
        }
      });
    } catch (e) {
      this.openSnackBar('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + e);
    }
  }

  get details(): FormArray {
    return this.reactiveForm.get('details') as FormArray;
  }

  addService(service: any) {
    const newItem = this.fb.group({
      recordResultId: [service.recordResultId],
      recordResultDetailId: [service.recordResultDetailId],
      serviceId: [service.serviceId],
      serviceName: [service.serviceName],
      userId: [service.userId],
      fullName: [service.fullName],
      result: [service.result],
      fileUrl: [service.fileUrl],
    });
    (this.reactiveForm.get('details') as FormArray).push(newItem);
  }

  removeService(index: number) {
    (this.reactiveForm.get('details') as FormArray).removeAt(index);
  }

  addSelected() {
    let selected = this.selectedServices.value as unknown as Array<Service>;

    if (selected) {
      selected?.forEach(service => {
        this.addService(service);
      });

      this.details.controls.forEach((control, index) => {
        this.details.at(index).patchValue({
          recordResultId: this.data.recordResultId
        });
      });

      this.reactiveForm.get('addServicesForm')?.get('selectedServices')?.setValue(null)
      this.openSnackBar('Đã thêm dịch vụ thành công!')
    }
  }

  byDoctor(index: number) {
    this.details.at(index).get('userId')?.setValue(this.accessJson.userId);
    this.details.at(index).get('fullName')?.setValue(this.accessJson.fullName);
  }

  /**
   * Upload
   */
  async onFileChange(event: any, index: number, serviceName: string | undefined) {
    this.files[index] = event.addedFiles;

    const file = event.addedFiles[0];
    if (file && serviceName !== undefined) {
      try {
        const voucherCode = this.reactiveForm.get('voucherCode')?.value;
        // const voucherCode = "HS000001";
        const folderPath = `images/HS-${voucherCode}/${serviceName}`; // Thay đổi thư mục tải lên
        const fileName = `${file.name}`; // Tên tệp tin tải lên
        const fileRef = this.storage.ref(`${folderPath}/${fileName}`);

        await this.storage.upload(`${folderPath}/${fileName}`, file);

        fileRef.getDownloadURL().subscribe(url => {
          this.details.at(index).get('fileUrl')?.setValue(url);
        })
        this.openSnackBar('Đã tải ảnh lên thành công!')
      } catch (error) {
        this.openSnackBar('Đã xảy ra lỗi khi tải ảnh lên! ' + error)
      }
    }
  }

  onRemove(index: number, file: File) {
    const fileIndex = this.files[index].indexOf(file);
    this.files[index].splice(fileIndex, 1);
    const fileUrl = this.details.at(index).get('fileUrl')?.value;

    if (fileUrl) {
      const fileRef = this.storage.refFromURL(fileUrl);

      fileRef.delete().subscribe(
        () => {
          this.details.at(index).get('fileUrl')?.setValue("");
          console.log('Ảnh đã được xóa thành công.');
        },
        (error) => {
          console.error('Lỗi khi xóa ảnh:', error);
        }
      );
    }
  }

  getFileValue(index: number): File[] {
    return this.files[index] || [];
  }

  /**
   * Prescription
   */
  changeItem() {
    const selected = this.reactiveForm.get('prescriptionForm')?.get('item')?.value

    if (this.items.includes(selected)) {
      this.reactiveForm.get('prescriptionForm')?.get('itemId')?.setValue(selected.itemId);
      this.reactiveForm.get('prescriptionForm')?.get('name')?.setValue(selected.medicineName);
      this.reactiveForm.get('prescriptionForm')?.get('unit')?.setValue(selected.unit);
      this.check = false
      this.openSnackBar('Vui lòng điền các thông tin điều trị!')
    } else {
      this.check = true
      this.openSnackBar('Thông tin thuốc đã nhập không tồn tại trong hệ thống');
    }
  }

  addPrescription() {
    const prescriptionForm = this.reactiveForm.get('prescriptionForm')?.value;
    const newPrescription: Prescription = {
      itemId: prescriptionForm.itemId,
      recordResultId: this.data.recordResultId,
      name: prescriptionForm.name,
      unit: prescriptionForm.unit,
      description: prescriptionForm.description,
      morning: prescriptionForm.morning,
      lunch: prescriptionForm.lunch,
      afternoon: prescriptionForm.afternoon,
      night: prescriptionForm.night,
      days: prescriptionForm.days,
    };
    let found = this.items.find(item => item.itemId === prescriptionForm.itemId);
    if (found) {
      this.prescriptions.push(newPrescription);
      this.reactiveForm.get('prescriptionForm')?.get('recordResultId')?.setValue(this.data.recordResultId);
      this.reactiveForm.get('prescriptionForm')?.get('itemId')?.setValue('');
      this.reactiveForm.get('prescriptionForm')?.get('item')?.setValue('');
      this.reactiveForm.get('prescriptionForm')?.get('unit')?.setValue('');
      this.reactiveForm.get('prescriptionForm')?.get('description')?.setValue('');
      this.reactiveForm.get('prescriptionForm')?.get('morning')?.setValue('');
      this.reactiveForm.get('prescriptionForm')?.get('lunch')?.setValue('');
      this.reactiveForm.get('prescriptionForm')?.get('afternoon')?.setValue('');
      this.reactiveForm.get('prescriptionForm')?.get('night')?.setValue('');
      this.reactiveForm.get('prescriptionForm')?.get('days')?.setValue('');
      this.openSnackBar('Đã thêm thuốc vào toa!')
    } else {
      this.openSnackBar('Mã thuốc chưa được chọn hoặc không tồn tại!')
    }
  }

  removePrescription(index: number) {
    this.prescriptions.splice(index, 1);
    this.openSnackBar('Đã xóa thuốc khỏi toa!')
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

  /**
   * Prescription Template
   */
  async getAllTemplate() {
    try {
      this.templateService.getAllTemplate().subscribe(data => {
        this.prescriptionTemplates = data;
      });
    } catch (e) {
      this.openSnackBar('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + e);
    }
  }

  onSelectTemplate() {
    const template = this.reactiveForm.get('prescriptionForm')?.get('template')?.value
    try {
      this.templateService.getTemplateDetailById(template).subscribe(data => {
        this.prescriptions = data;
      });

      this.reactiveForm.get('prescriptionForm')?.get('template')?.setValue('');
    } catch (e) {
      this.openSnackBar('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + e);
    }
  }

  switch() {
    this.switchValue = this.reactiveForm.get('prescriptionForm')?.get('switch')?.value
  }

  /**
   * User
   */
  getUserInfo() {
    this.accessJson = this.tokenStorageService.getAccessJson()
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
    const voucher = this.reactiveForm.value;
    voucher.prescriptions = this.prescriptions;
    console.table(voucher);
    this.recordResultService.updateRecordResult(voucher).subscribe({
      complete: () => this.openSnackBar(`Cập nhật bệnh án thành công`)
    });
  }

}
