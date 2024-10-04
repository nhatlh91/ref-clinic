import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-employee-create',
  templateUrl: './dialog-employee-create.component.html'
})
export class DialogEmployeeCreateComponent {
  reactiveForm!: FormGroup;
  roles= ['RECEPTIONIST', 'DOCTOR', 'PHARMACIST'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      role: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0[0-9]{9}')]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
}
