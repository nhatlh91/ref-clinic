import {Component} from '@angular/core';
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {AuthService} from "../../../login/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogImportVoucherCreateComponent
} from "../dialog-import-voucher-create/dialog-import-voucher-create.component";

@Component({
  selector: 'app-pharmacy-main',
  templateUrl: './pharmacy-main.component.html',
  styleUrl: './pharmacy-main.component.css'
})
export class PharmacyMainComponent {
  fullAccess = false;
  fullAccessRoles = ['ADMIN', 'PHARMACIST'];
  role: string;

  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog,) {
    this.role = this.tokenStorageService.getDecryptedRole();
    this.fullAccess = this.fullAccessRoles.includes(this.role);
  }

  dialogCreate() {
    const dialogRef = this.dialog.open(DialogImportVoucherCreateComponent, {
      width: '90%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      debugger;
      // this.patientService.savePatient(next).subscribe(() => {
      //   this.openSnackBar('Thêm mới thành công!')
      //   this.ngOnInit();
      // });
    })
  }
}
