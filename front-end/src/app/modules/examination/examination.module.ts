import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExaminationRoutingModule} from './examination-routing.module';
import {ExaminationMainComponent} from './components/examination-main/examination-main.component';
import {
  DialogRegistrationCreateComponent
} from './components/dialog-registration-create/dialog-registration-create.component';
import {
  DialogRecordResultUpdateComponent
} from './components/dialog-record-result-update/dialog-record-result-update.component';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule,} from "@angular/material/datepicker";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule, MatSelectTrigger} from "@angular/material/select";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgxDropzoneModule} from "ngx-dropzone";
import {RegistrationListComponent} from './components/registration-list/registration-list.component';
import {RecordResultListComponent} from './components/record-result-list/record-result-list.component';
import {ServiceListComponent} from './components/service-list/service-list.component';
import {DialogServiceCreateComponent} from './components/dialog-service-create/dialog-service-create.component';
import {MatCardModule, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatChip} from "@angular/material/chips";
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
import {
  DialogRegistrationDetailComponent
} from './components/dialog-registration-detail/dialog-registration-detail.component';
import {NgxPrintDirective, NgxPrintModule} from "ngx-print";
import {
  DialogPrescriptionTemplateCreateComponent
} from './components/dialog-prescription-template-create/dialog-prescription-template-create.component';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import { PrescriptionTemplateListComponent } from './components/prescription-template-list/prescription-template-list.component';
import { DialogPrescriptionTemplateDetailComponent } from './components/dialog-prescription-template-detail/dialog-prescription-template-detail.component';

@NgModule({
  declarations: [
    ExaminationMainComponent,
    DialogRegistrationCreateComponent,
    DialogRecordResultUpdateComponent,
    RegistrationListComponent,
    RecordResultListComponent,
    ServiceListComponent,
    DialogServiceCreateComponent,
    DialogRegistrationDetailComponent,
    DialogPrescriptionTemplateCreateComponent,
    PrescriptionTemplateListComponent,
    DialogPrescriptionTemplateDetailComponent,
  ],
    imports: [
        CommonModule,
        ExaminationRoutingModule,
        MatSlideToggle,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSelectTrigger,
        MatDialogClose,
        MatButtonModule,
        MatInputModule,
        MatMenuTrigger,
        MatTabGroup,
        MatTab,
        NgxDropzoneModule,
        MatCardModule,
        MatIcon,
        MatTooltip,
        MatChip,
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
        MatMenu,
        MatMenuItem,
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
        NgxPrintModule,
        MatRadioButton,
        MatRadioGroup
    ]
})
export class ExaminationModule {
}
