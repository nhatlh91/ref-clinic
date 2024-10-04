import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyMainComponent } from './components/pharmacy-main/pharmacy-main.component';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { DialogMedicineCreateComponent } from './components/dialog-medicine-create/dialog-medicine-create.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ImportVoucherListComponent } from './components/import-voucher-list/import-voucher-list.component';
import { ExportVoucherListComponent } from './components/export-voucher-list/export-voucher-list.component';
import { DialogImportVoucherCreateComponent } from './components/dialog-import-voucher-create/dialog-import-voucher-create.component';
import { DialogExportVoucherCreateComponent } from './components/dialog-export-voucher-create/dialog-export-voucher-create.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconAnchor, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import { DialogImportVoucherDetailComponent } from './components/dialog-import-voucher-detail/dialog-import-voucher-detail.component';
import { DialogExportVoucherDetailComponent } from './components/dialog-export-voucher-detail/dialog-export-voucher-detail.component';
import {NgxPrintDirective} from "ngx-print";


@NgModule({
  declarations: [
    PharmacyMainComponent,
    MedicineListComponent,
    DialogMedicineCreateComponent,
    InventoryComponent,
    ImportVoucherListComponent,
    ExportVoucherListComponent,
    DialogImportVoucherCreateComponent,
    DialogExportVoucherCreateComponent,
    DialogImportVoucherDetailComponent,
    DialogExportVoucherDetailComponent
  ],
    imports: [
        CommonModule,
        PharmacyRoutingModule,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatTooltip,
        MatMenuTrigger,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatSelect,
        MatOption,
        MatDialogContent,
        MatIconAnchor,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatDialogActions,
        MatCheckbox,
        MatRadioGroup,
        MatRadioButton,
        MatDialogTitle,
        MatMiniFabButton,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatPaginator,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatHeaderCellDef,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatError,
        MatSuffix,
        MatDialogClose,
        MatMiniFabButton,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatSuffix,
        NgxPrintDirective
    ]
})
export class PharmacyModule { }
