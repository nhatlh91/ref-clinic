import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {environment} from "../../../../../environments/environment";
import {HealthCheckService} from "../../services/health-check.service";
import CryptoJS from 'crypto-js';
import {MatSnackBar} from "@angular/material/snack-bar";

const SECRET_KEY = environment.secretKey;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  rf!: FormGroup;

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private healthCheckService: HealthCheckService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.healthCheckService.healthCheck().subscribe({
      error: err => this.openSnackBar('Kết nối đến máy chủ đang gặp sự cố. Vui lòng kiểm tra lại')
    });
  }

  ngOnInit(): void {
    this.rf = new FormGroup({
        phone: new FormControl('', [
          Validators.required
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.maxLength(32)
        ]),
      }
    );
  }

  createDate() {
    const today = new Date();
    today.setHours(today.getHours() + 24); // Thêm 24 giờ vào ngày hiện tại
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onSubmit() {
    this.authService.login(this.rf.value).subscribe(value => {
      this.openSnackBar('Đăng nhập thành công');
      const encryptedRole = CryptoJS.AES.encrypt(value.role, SECRET_KEY).toString();      // Mã hóa role
      const encryptedName = CryptoJS.AES.encrypt(value.fullName, SECRET_KEY).toString();      // Mã hóa name
      const encryptedDate = CryptoJS.AES.encrypt(this.createDate(), SECRET_KEY).toString();      // Mã hóa date
      const encryptedAccessJson = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();      // Chuyển Json thành chuỗi và mã hóa
      sessionStorage.clear();
      this.tokenStorageService.saveAccessTokenLocal(value.accessToken);
      this.tokenStorageService.saveRefreshTokenLocal(value.refreshToken);
      this.tokenStorageService.saveRoleLocal(encryptedRole);
      this.tokenStorageService.saveUserLocal(encryptedName);
      this.tokenStorageService.saveCreLocal(encryptedDate);
      this.tokenStorageService.saveAccessJson(encryptedAccessJson);
      this.router.navigateByUrl('/production');
    }, error => {
      if (error.status === 401) {
        // Handle Unauthorized (401) error here
        this.rf.reset();
        this.openSnackBar('Thông tin đăng nhập chưa chính xác')
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }
}

export class AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
  fullName: string;
  userId: number;
}
