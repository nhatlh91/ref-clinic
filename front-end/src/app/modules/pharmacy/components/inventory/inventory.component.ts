import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {InventoryDto} from "../../models/item";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ItemService} from "../../services/item.service";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {AuthService} from "../../../login/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  dataSource = new MatTableDataSource<InventoryDto>();
  displayedColumns: string[] = ['medicineName','activeIngredient', 'barcode', 'remainingQuantity', 'importQuantity', 'unitPrice', 'importDate', 'expiryDate'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private itemService: ItemService,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.checkToken();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.itemService.getInventory().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        debugger;
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

  checkToken() {
    const today = new Date().getTime();
    const cre = this.tokenStorageService.getCreateDate();
    const parsedDateString = cre.replace(/"/g, '').trim();
    const expDate = new Date(parsedDateString).getTime();
    if (today > expDate) {
      alert('Phiên làm việc đã kết thúc, vui lòng đăng nhập lại !');
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

  onExportExcelClicked() {

  }
}
