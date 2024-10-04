import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Registration} from "../../models/registration";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {AuthService} from "../../../login/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogRegistrationCreateComponent} from "../dialog-registration-create/dialog-registration-create.component";
import {DialogRegistrationDetailComponent} from "../dialog-registration-detail/dialog-registration-detail.component";
import {PrescriptionTemplate} from "../../models/record-result";
import {PrescriptionTemplateService} from "../../service/prescription-template.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  DialogPrescriptionTemplateCreateComponent
} from "../dialog-prescription-template-create/dialog-prescription-template-create.component";
import {Item} from "../../../pharmacy/models/item";
import {
  DialogPrescriptionTemplateDetailComponent
} from "../dialog-prescription-template-detail/dialog-prescription-template-detail.component";

@Component({
  selector: 'app-prescription-template-list',
  templateUrl: './prescription-template-list.component.html',
  styleUrl: './prescription-template-list.component.css'
})
export class PrescriptionTemplateListComponent {
  dataSource = new MatTableDataSource<PrescriptionTemplate>();
  displayedColumns: string[] = ['prescriptionTemplateId', 'description', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private tokenStorageService: TokenStorageService,
              private prescriptionTemplateService: PrescriptionTemplateService,
              private authService: AuthService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.checkToken();
    this.getData();
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.prescriptionTemplateService.getAllTemplate().subscribe({
      next: value => this.dataSource.data = value,
      error: err => {
        this.openSnackBar('Có lỗi xảy ra trong quá trình truy vấn dữ liệu. Xin thử lại');
        this.dataSource.data = [];
      }
    })
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
    this._snackBar.open(message, 'Đóng', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }

  detail(item: PrescriptionTemplate) {
    const dialogRef = this.dialog.open(DialogPrescriptionTemplateDetailComponent, {
      width: '50%',
      data: item,
      // disableClose: true
    });
  }

  create() {
    const dialogRef = this.dialog.open(DialogPrescriptionTemplateCreateComponent, {
      width: '92vw', height: '80vh', maxWidth: '92vw', maxHeight: '80vh', panelClass: 'full-screen-dialog'
    });
    dialogRef.afterClosed().subscribe(next => this.getData());
  }

  delete(item: PrescriptionTemplate) {
    const input = prompt(`Nhập "delete" vào ô bên dưới để xác nhận xóa đơn ${item.description} ra khỏi hệ thống`)
    if (input != 'delete') return;
    this.prescriptionTemplateService.deleteTemplateById(item.prescriptionTemplateId).subscribe(next => {
      this.openSnackBar('Đã xóa');
      this.getData();
    })
  }
}
