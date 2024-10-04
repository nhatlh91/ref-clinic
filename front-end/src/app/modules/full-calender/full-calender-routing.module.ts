import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../auth.guard";
import {RoleGuard} from "../../role.guard";
import {BookingComponent} from "./components/booking/booking.component";

const routes: Routes = [{
  path: '',
  component: BookingComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: {roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST']},
  // children: [
  //   {
  //     path: '', // child route path
  //     component: EmployeeListComponent, // child route component that the router renders
  //   }
  // ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullCalenderRoutingModule { }
