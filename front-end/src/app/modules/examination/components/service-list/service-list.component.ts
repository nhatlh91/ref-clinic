import {Component, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Service} from "../../models/service";
import {RegistrationService} from "../../service/registration.service";
import {DialogServiceCreateComponent} from "../dialog-service-create/dialog-service-create.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})

export class ServiceListComponent implements OnInit {
  dataSource = new MatTableDataSource<Service>();
  displayedColumns: string[] = ['serviceName', 'description', 'price', 'action'];
  role: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private registrationService: RegistrationService,
              private tokenStorageService: TokenStorageService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.role = this.tokenStorageService.getDecryptedRole();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.registrationService.getServices().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => {
        if (error.status !== 404) alert('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + error.status);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Đóng', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }

  createDialog() {
    const dialogRef = this.dialog.open(DialogServiceCreateComponent, {
      // width: '60%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      debugger;
      if (!next) return;
      this.registrationService.saveService(next).subscribe({
        complete: () => {
          this.ngOnInit();
          this.openSnackBar('Thêm mới thành công!')
        }
      });
    })
  }

  edit(item: Service) {
    const input = prompt(`Cập nhật giá tiền cho dịch vụ ${item.serviceName}:`);
    if (input == null) return;
    if (isNaN(parseFloat(input))) return;
    item.price = parseFloat(input);
    this.registrationService.saveService(item).subscribe({complete: () => this.openSnackBar('Thao tác thành công!')});
  }

  onExportExcelClicked() {

  }
}
