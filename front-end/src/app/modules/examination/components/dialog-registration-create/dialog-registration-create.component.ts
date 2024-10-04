import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Patient} from "../../../patient/models/patient";
import {Service} from "../../models/service";
import {PatientService} from "../../../patient/patient.service";
import {RegistrationService} from "../../service/registration.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog-registration-create',
  templateUrl: './dialog-registration-create.component.html',
  styleUrl: './dialog-registration-create.component.css'
})
export class DialogRegistrationCreateComponent implements OnInit {
  reactiveForm!: FormGroup;
  patient: FormControl = new FormControl();
  patients: Patient[] = [];
  filteredPatient!: Observable<Patient[]>;
  identity = "";
  gender = "";
  birthDay = "";
  phone = "";
  address = "";
  services: FormControl = new FormControl('');
  serviceList: any[] = [];
  isValid = false

  constructor(private fb: FormBuilder,
              private patientService: PatientService,
              private _snackBar: MatSnackBar,
              private registrationService: RegistrationService) {
    this.reactiveForm = this.fb.group({
      createDate: [''],
      patientId: [''],
      patient: this.patient,
      services: this.services,  // mảng serviceId
      totalAmount: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getAllServices();
    await this.getAllPatient();

    this.filteredPatient = this.patient.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.patientName),
        map(name => name ? this._filterPatient(name) : this.patients.slice())
      );
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

  onServiceSelect() {
    const selectedServices = this.services.value;
    this.getTotal()
  }

  getTotal() {
    debugger
    const selected = this.services.value as unknown as Array<Service>;

    const selectedService = this.serviceList.filter(service => {
      return selected.includes(service);
    });

    return selectedService.reduce((total, service) => {
      const totalAmount = typeof service.price !== 'undefined' ? total + service.price : total;

      this.reactiveForm.get('totalAmount')?.setValue(totalAmount)
      return totalAmount
    }, 0);
  }

  async getAllServices() {
    try {
      this.registrationService.getServices().subscribe(data => {
        this.serviceList = data;
      });
    } catch (e) {
      this.openSnackBar('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + e);
    }
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

  changePatient() {
    this.patient.valueChanges.subscribe(selected => {
      let foundSelected = this.patients.find(item => item === selected);

      if (foundSelected) {
        this.identity = selected.identity;
        this.gender = selected.gender;
        this.birthDay = selected.birthDay;
        this.phone = selected.phone;
        this.address = selected.address;
        this.openSnackBar('Đã chọn khách hàng!')
        this.isValid = true
      } else {
        this.openSnackBar('Khách hàng không tồn tại!')
        this.isValid = false
      }
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
    const voucher = this.reactiveForm.value;
    voucher.patientId = voucher.patient.patientId;
    voucher.patientIdentity = voucher.patient.identity;
    voucher.patientName = voucher.patient.patientName;
    voucher.createDate = new Date();
    voucher.createDate.setHours(voucher.createDate.getHours() + 7);
    try {
      this.registrationService.saveRegistration(voucher).subscribe(() => {
      });
      this.openSnackBar('Đã đăng ký thành công!')
    } catch (e) {
      this.openSnackBar('Lỗi khi đăng ký! ' + e)
    }
  }
}
