import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ImportVoucher} from "../../models/item";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ItemService} from "../../services/item.service";
import {AuthInfo, TokenStorageService} from "../../../login/services/token-storage.service";
import {AuthService} from "../../../login/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogImportVoucherCreateComponent
} from "../dialog-import-voucher-create/dialog-import-voucher-create.component";
import {
  DialogImportVoucherDetailComponent
} from "../dialog-import-voucher-detail/dialog-import-voucher-detail.component";

@Component({
  selector: 'app-import-voucher-list',
  templateUrl: './import-voucher-list.component.html',
  styleUrl: './import-voucher-list.component.css'
})
export class ImportVoucherListComponent {
  dataSource = new MatTableDataSource<ImportVoucher>();
  displayedColumns: string[] = ['importVoucherId', 'createDate', 'description', 'totalAmount', 'vendor', 'createdBy'];
  year = new Date().getFullYear();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  currentUser?: AuthInfo;

  constructor(private itemService: ItemService,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.checkToken();
    this.getData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    if (this.year < 2024) {
      this.dataSource.data = [];
    } else {
      this.itemService.getImportVouchers(this.year).subscribe({
        next: (data) => this.dataSource.data = data,
        error: (error) => {
          if (error.status == 404) {
            this.dataSource.data = []
          } else {
            alert('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + error.status)
          }
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkToken() {
    const today = new Date().getTime();
    const cre = this.tokenStorageService.getCreateDate();
    const parsedDateString = cre.replace(/"/g, '').trim();
    const expDate = new Date(parsedDateString).getTime();
    if (today > expDate) {
      alert('Phiên đăng nhập kết thúc, vui lòng đăng nhập lại !');
      this.authService.signOut();
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }

  delete(item: ImportVoucher) {
    this.openSnackBar('Chức năng này hiện đang được phát triển');
    // const input = prompt(`Nhập "delete" vào ô bên dưới để xác nhận xóa chứng từ khỏi hệ thống`)
    // if (input != 'delete') return;
    // this.itemService.deleteImportVouchers(item.importVoucherId).subscribe(next => {
    //   this.openSnackBar('Đã xóa');
    //   this.getData();
    // })
  }

  saveToFile() {

  }

  import() {
    const dialogRef = this.dialog.open(DialogImportVoucherCreateComponent, {
      width: '90%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      complete: () => this.getData()
    })
  }

  detail(item: ImportVoucher) {
    const dialogRef = this.dialog.open(DialogImportVoucherDetailComponent, {
      data: item,
      width: '50%',
      // disableClose: true
    });
    // dialogRef.afterClosed().subscribe({
    //   complete: () => this.getData()
    // })
  }
}
