import {Component} from '@angular/core';
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {AuthService} from "../../../login/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogPrescriptionTemplateCreateComponent
} from "../dialog-prescription-template-create/dialog-prescription-template-create.component";

@Component({
  selector: 'app-examination-main',
  templateUrl: './examination-main.component.html',
  styleUrl: './examination-main.component.css'
})
export class ExaminationMainComponent {

  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog,) {
  }

  templateCreate() {
    const dialogRef = this.dialog.open(DialogPrescriptionTemplateCreateComponent, {
      width: '92vw', height: '80vh', maxWidth: '92vw', maxHeight: '80vh', panelClass: 'full-screen-dialog'
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
