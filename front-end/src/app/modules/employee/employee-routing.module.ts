import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../auth.guard";
import {RoleGuard} from "../../role.guard";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {EmployeeMainComponent} from "./components/employee-main/employee-main.component";

const routes: Routes = [{
  path: '',
  component: EmployeeMainComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: {roles: ['ADMIN']},
  children: [
    {
      path: '', // child route path
      component: EmployeeListComponent, // child route component that the router renders
    }
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
