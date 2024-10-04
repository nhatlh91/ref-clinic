import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layouts/layout/layout.component";
import {RoleGuard} from "./role.guard";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/login/login.module').then(module => module.LoginModule)},
  {
    path: 'production',
    component: LayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST']},
    children: [
      {
        path: 'doctor',
        loadChildren: () => import('./modules/examination/examination.module').then(module => module.ExaminationModule)
      },
      {
        path: 'receptionist',
        loadChildren: () => import('./modules/patient/patient.module').then(module => module.PatientModule)
      },
      {
        path: 'pharmacist',
        loadChildren: () => import('./modules/pharmacy/pharmacy.module').then(module => module.PharmacyModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./modules/employee/employee.module').then(module => module.EmployeeModule)
      },
      {
        path: 'booking',
        loadChildren: () => import('./modules/full-calender/full-calender.module').then(module => module.FullCalenderModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./modules/report/report.module').then(module => module.ReportModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
