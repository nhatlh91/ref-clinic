import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-service-create',
  templateUrl: './dialog-service-create.component.html',
  styleUrl: './dialog-service-create.component.css'
})
export class DialogServiceCreateComponent {
  reactiveForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      serviceName: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }
}
