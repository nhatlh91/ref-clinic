import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientRoutingModule} from './patient-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogClose, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import {MatError, MatFormField, MatInput, MatInputModule, MatLabel, MatSuffix} from "@angular/material/input";
import {
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatIconAnchor,
  MatIconButton,
  MatMiniFabAnchor
} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelect, MatSelectModule, MatSelectTrigger} from "@angular/material/select";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgxDropzoneModule} from "ngx-dropzone";
import { PatientMainComponent } from './components/patient-main/patient-main.component';
import { DialogPatientCreateComponent } from './components/dialog-patient-create/dialog-patient-create.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import { DialogPatientDetailComponent } from './components/dialog-patient-detail/dialog-patient-detail.component';


@NgModule({
  declarations: [
    PatientMainComponent,
    DialogPatientCreateComponent,
    PatientListComponent,
    DialogPatientDetailComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatDialogClose,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatSelect,
    MatOption,
    MatError,
    HttpClientModule,
    MatPaginator,
    MatIconAnchor,
    MatMiniFabAnchor,
    MatTooltip,
    MatIcon,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatIconButton,
    MatSortModule,
    MatAnchor,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDialogContent,
  ]
})
export class PatientModule {
}
