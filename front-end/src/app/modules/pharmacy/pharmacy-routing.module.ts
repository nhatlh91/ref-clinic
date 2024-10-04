import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../auth.guard";
import {RoleGuard} from "../../role.guard";
import {PharmacyMainComponent} from "./components/pharmacy-main/pharmacy-main.component";
import {InventoryComponent} from "./components/inventory/inventory.component";
import {ImportVoucherListComponent} from "./components/import-voucher-list/import-voucher-list.component";
import {MedicineListComponent} from "./components/medicine-list/medicine-list.component";
import {ExportVoucherListComponent} from "./components/export-voucher-list/export-voucher-list.component";
import {
  DialogExportVoucherCreateComponent
} from "./components/dialog-export-voucher-create/dialog-export-voucher-create.component";
import {
  DialogImportVoucherCreateComponent
} from "./components/dialog-import-voucher-create/dialog-import-voucher-create.component";

const routes: Routes = [
  {
    path: '',
    component: PharmacyMainComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST']},
    children: [
      {
        path: '', // child route path
        component: MedicineListComponent, // child route component that the router renders
      },
      {
        path: 'import-list', // child route path
        component: ImportVoucherListComponent, // child route component that the router renders
      },
      {
        path: 'export-list', // child route path
        component: ExportVoucherListComponent, // child route component that the router renders
      },
      {
        path: 'export-create', // child route path
        component: DialogExportVoucherCreateComponent, // child route component that the router renders
      },
      {
        path: 'import-create', // child route path
        component: DialogImportVoucherCreateComponent, // child route component that the router renders
      },
      {
        path: 'inventory', // child route path
        component: InventoryComponent, // child route component that the router renders
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule {
}
