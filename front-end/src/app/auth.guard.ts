import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from "./modules/login/services/token-storage.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenStorageService: TokenStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.tokenStorageService.getToken();
    if (token !== null) {
      return true;
    }

    this.snackBar.open('Vui lòng đăng nhập hệ thống!', 'x', {
      // duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.router.navigate(['/'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }

}
