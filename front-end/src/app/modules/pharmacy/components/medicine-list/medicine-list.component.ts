import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {AuthService} from "../../../login/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Item} from "../../models/item";
import {ItemService} from "../../services/item.service";
import {DialogMedicineCreateComponent} from "../dialog-medicine-create/dialog-medicine-create.component";

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrl: './medicine-list.component.css'
})
export class MedicineListComponent {
  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['activeIngredient', 'medicineName', 'description', 'strength', 'unit', 'packaging', 'manufacturer', 'barcode'];
  fullAccess = false;
  fullAccessRole = ["ADMIN", "PHARMACIST"];
  role: string;
  name: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private itemService: ItemService,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.role = this.tokenStorageService.getDecryptedRole();
    this.name = this.tokenStorageService.getDecryptedName();
    this.fullAccess = this.fullAccessRole.includes(this.role);
    if(this.fullAccess) this.displayedColumns.push('action');
  }

  ngOnInit() {
    this.checkToken();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.itemService.getItems().subscribe({
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

  create() {
    const dialogRef = this.dialog.open(DialogMedicineCreateComponent, {
      width: '60%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      debugger;
      this.itemService.saveItem(next).subscribe(() => {
        this.openSnackBar('Thêm mới thành công!')
        this.ngOnInit();
      });
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }

  delete(item: Item) {
    const input = prompt(`Nhập "delete" vào ô bên dưới để xác nhận xóa thuốc ${item.medicineName} ra khỏi danh mục`)
    if (input != 'delete') return;
    this.itemService.deleteItem(item.itemId).subscribe(next => {
      this.openSnackBar('Đã xóa');
      this.ngOnInit();
    })
  }

  onExportExcelClicked() {

  }
}
