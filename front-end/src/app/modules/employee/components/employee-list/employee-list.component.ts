import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {UserDto} from "../models/user-dto";
import {EmployeeService} from "../../services/employee.service";
import {DialogEmployeeCreateComponent} from "../dialog-employee-create/dialog-employee-create.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  dataSource = new MatTableDataSource<UserDto>();
  displayedColumns: string[] = ['fullName', 'phone', 'role', 'action'];
  role: string;

  constructor(private employeeService: EmployeeService,
              private tokenStorageService: TokenStorageService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.role = this.tokenStorageService.getDecryptedRole();
  }

  ngOnInit(): void {
    this.employeeService.getUsers().subscribe({
      next: (data) => {
        this.dataSource.data = data.sort(function (a, b) {
          const x = a.fullName?.split(" ").pop()?.toLowerCase();
          const y = b.fullName?.split(" ").pop()?.toLowerCase();
          if (x == undefined || y == undefined) return 0;
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        });
      },
      error: (error) => {
        if (error.status !== 404) this.openSnackBar('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + error.status);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }

  createDialog() {
    const dialogRef = this.dialog.open(DialogEmployeeCreateComponent, {
      // width: '60%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      debugger;
      if (!next) return;
      this.employeeService.saveUser(next).subscribe({
        complete: () => {
          this.openSnackBar('Thêm mới thành công!')
          this.ngOnInit();
        }
      });
    })
  }

  disable(item: UserDto) {
    const input = prompt(`Nhập "delete" vào ô bên dưới để xác nhận xóa tài khoản ${item.phone}:`);
    if (input == 'delete') {
      this.employeeService.deleteUserById(item.userId).subscribe({
        complete: () => {
          this.openSnackBar('Đã xóa');
          this.ngOnInit();
        }
      });
    }
    this.openSnackBar('Đã hủy thao tác')
  }

  edit(item: UserDto) {
    const input = prompt(`Nhập mật khẩu mới cho ${item.phone}:`);
    if (input == null) return;
    this.employeeService.resetPassword({
      userId: item.userId,
      password: input,
    }).subscribe({complete: () => this.openSnackBar('Cập nhật thành công!')});
  }
}

export interface ResetPasswordRequest {
  userId: number | undefined;
  password: string;
}

export interface RegisterRequest {
  phone: string;
  fullName: string;
  password: string;
  role: string;
}
