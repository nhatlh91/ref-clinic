import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  DialogPatientCreateComponent
} from "../../../modules/patient/components/dialog-patient-create/dialog-patient-create.component";
import {TokenStorageService} from "../../../modules/login/services/token-storage.service";
import {AuthService} from "../../../modules/login/services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  panelOpenState = false;
  decryptedRole = '';
  decryptedName = '';

  constructor(private dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
  ) {
    this.decryptedRole = this.tokenStorageService.getDecryptedRole();
  }

  ngOnInit() {

  }

  PatientCreate() {
    const dialogRef = this.dialog.open(DialogPatientCreateComponent, {
      width: '60%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    })
  }


  signOut() {
    this.authService.signOut()
    this.router.navigateByUrl('')
  }
}
