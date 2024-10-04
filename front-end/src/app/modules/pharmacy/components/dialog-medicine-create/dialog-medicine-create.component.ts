import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-medicine-create',
  templateUrl: './dialog-medicine-create.component.html'
})
export class DialogMedicineCreateComponent {
  reactiveForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      barcode: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      medicineName: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      activeIngredient: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      dosageForm: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      strength: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      unit: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      packaging: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      manufacturer: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      retailPrice: new FormControl('', [Validators.required, Validators.min(0)]),
      priceWithService: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }
}
