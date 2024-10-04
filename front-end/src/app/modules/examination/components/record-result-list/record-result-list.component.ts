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
import {RecordResult} from "../../models/record-result";
import {RecordResultService} from "../../service/record-result.service";
import {DialogRecordResultUpdateComponent} from "../dialog-record-result-update/dialog-record-result-update.component";

@Component({
  selector: 'app-record-result-list',
  templateUrl: './record-result-list.component.html',
  styleUrl: './record-result-list.component.css'
})
export class RecordResultListComponent {
  dataSource = new MatTableDataSource<RecordResult>();
  displayedColumns: string[] = ['registrationId', 'patientIdentity', 'patientName'];
  decryptedRole: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private tokenStorageService: TokenStorageService,
              private recordResultService: RecordResultService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.checkToken();
    this.getRole();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.recordResultService.getRecords().subscribe({
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

  getRole() {
    if (this.tokenStorageService.getRole()) {
      this.decryptedRole = this.tokenStorageService.getDecryptedRole();
    }
  }

  detail(item: RecordResult) {
    const dialogRef = this.dialog.open(DialogRecordResultUpdateComponent, {
      width: '92vw', height: '80vh', maxWidth: '92vw', maxHeight: '80vh', panelClass: 'full-screen-dialog',
      data: item,
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    })
  }

  today() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Thêm '0' phía trước nếu cần
    const day = String(today.getDate()).padStart(2, '0'); // Thêm '0' phía trước nếu cần

    return `${day}-${month}-${year}`;
  }

  onExportExcelClicked() {

  }
}
