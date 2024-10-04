import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExaminationMainComponent} from "./components/examination-main/examination-main.component";
import {
  DialogRecordResultUpdateComponent
} from "./components/dialog-record-result-update/dialog-record-result-update.component";
import {RecordResultListComponent} from "./components/record-result-list/record-result-list.component";
import {ServiceListComponent} from "./components/service-list/service-list.component";
import {AuthGuard} from "../../auth.guard";
import {RoleGuard} from "../../role.guard";
import {
  PrescriptionTemplateListComponent
} from "./components/prescription-template-list/prescription-template-list.component";

const routes: Routes = [
  {
    path: '',
    component: ExaminationMainComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST']},
    children: [
      {
        path: '', // child route path
        component: RecordResultListComponent, // child route component that the router renders
      },
      {
        path: 'record-result', // child route path
        component: RecordResultListComponent, // child route component that the router renders
      },
      {
        path: 'service', // child route path
        component: ServiceListComponent, // child route component that the router renders
      },
      {
        path: 'record-result-update', // child route path
        component: DialogRecordResultUpdateComponent, // child route component that the router renders
      },
      {
        path: 'prescription-template-list', // child route path
        component: PrescriptionTemplateListComponent, // child route component that the router renders
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationRoutingModule {
}
