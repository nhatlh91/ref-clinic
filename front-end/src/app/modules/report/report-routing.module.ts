import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../auth.guard";
import {RoleGuard} from "../../role.guard";
import {ReportMainComponent} from "./components/report-main/report-main.component";
import {RevenueByCustomerComponent} from "./components/revenue-by-customer/revenue-by-customer.component";

const routes: Routes = [
  {
    path: '',
    component: ReportMainComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST']},
    children: [
      {
        path: '', // child route path
        component: RevenueByCustomerComponent, // child route component that the router renders
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
