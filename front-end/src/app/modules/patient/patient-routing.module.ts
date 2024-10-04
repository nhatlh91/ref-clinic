import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientMainComponent} from "./components/patient-main/patient-main.component";
import {PatientListComponent} from "./components/patient-list/patient-list.component";
import {RegistrationListComponent} from "../examination/components/registration-list/registration-list.component";
import {AuthGuard} from "../../auth.guard";
import {RoleGuard} from "../../role.guard";
import {ServiceListComponent} from "../examination/components/service-list/service-list.component";

const routes: Routes = [
  {
    path: '',
    component: PatientMainComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST']},
    children: [
      {
        path: '', // child route path
        component: RegistrationListComponent, // child route component that the router renders
      },
      {
        path: 'patient-list', // child route path
        component: PatientListComponent, // child route component that the router renders
      },
      {
        path: 'service-list', // child route path
        component: ServiceListComponent, // child route component that the router renders
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}
