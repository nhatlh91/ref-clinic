import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { DialogEmployeeCreateComponent } from './components/dialog-employee-create/dialog-employee-create.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogClose} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeMainComponent,
    DialogEmployeeCreateComponent
  ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatTooltip,
        MatMenuTrigger,
        MatButton,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatFormField,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatInput,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatError,
        MatLabel,
        MatOption,
        MatSelect,
        MatSuffix,
        ReactiveFormsModule,
        MatDialogClose,
        MatPaginator
    ]
})
export class EmployeeModule { }
