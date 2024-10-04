import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../patient.service";

@Component({
  selector: 'app-dialog-patient-create',
  templateUrl: './dialog-patient-create.component.html'
})
export class DialogPatientCreateComponent implements OnInit {
  reactiveForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      patientName: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      gender: new FormControl('Nam', [Validators.required]),
      birthday: new FormControl('', ),
      address: new FormControl('', [Validators.maxLength(1000)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0[0-9]{9}')]),
    });
  }

}
