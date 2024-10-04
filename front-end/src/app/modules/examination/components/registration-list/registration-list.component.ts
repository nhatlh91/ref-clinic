import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Patient} from "../../../patient/models/patient";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PatientService} from "../../../patient/patient.service";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {AuthService} from "../../../login/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";

import {
  DialogPatientDetailComponent
} from "../../../patient/components/dialog-patient-detail/dialog-patient-detail.component";
import {DialogRegistrationCreateComponent} from "../dialog-registration-create/dialog-registration-create.component";
import {RegistrationService} from "../../service/registration.service";
import {Registration} from "../../models/registration";
import {DialogRegistrationDetailComponent} from "../dialog-registration-detail/dialog-registration-detail.component";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.css'
})
export class RegistrationListComponent {
  dataSource = new MatTableDataSource<Registration>();
  displayedColumns: string[] = ['registrationId', 'patientIdentity', 'patientName', 'totalAmount'];
  decryptedRole: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private tokenStorageService: TokenStorageService,
              private registrationService: RegistrationService,
              private authService: AuthService,
              private dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit() {
    this.checkToken();
    this.getRole();
    debugger;
    this.registrationService.getRegistration().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => {
        if (error.status !== 404) alert('Có lỗi phát sinh trong quá trình truy vấn dữ liệu - ' + error.status);
      }
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  announceSortChange(sortState: Sort) {
    console.table(sortState);
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getRole() {
    if (this.tokenStorageService.getRole()) {
      this.decryptedRole = this.tokenStorageService.getDecryptedRole();
    }
  }

  create() {
    const dialogRef = this.dialog.open(DialogRegistrationCreateComponent, {
      // width: '90%',
      // height: "85%",
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    })
  }

  detail(registration: Registration) {
    const dialogRef = this.dialog.open(DialogRegistrationDetailComponent, {
      width: '50%',
      data: registration,
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
    // const workbook = new ExcelJS.Workbook();
    // const worksheet = workbook.addWorksheet('Sheet1');
    //
    // // Thêm dòng header
    // const headerRow = worksheet.addRow(['TÊN KHÁCH HÀNG', 'NHÓM', 'ĐIỆN THOẠI', 'ĐỊA CHỈ', 'CÔNG NỢ PHẢI THU']);
    //
    // // Định dạng dòng header
    // headerRow.eachCell((cell) => {
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: {argb: '2980b9'},
    //   };
    //   cell.font = {
    //     color: {argb: 'f5f6fa'}, // Màu chữ trắng
    //     bold: true // Chữ in đậm
    //   };
    //   cell.border = {
    //     top: {style: 'thin'},
    //     left: {style: 'thin'},
    //     bottom: {style: 'thin'},
    //     right: {style: 'thin'}
    //   };
    // });
    //
    // // Thêm dữ liệu vào sheet
    // this.dataSource.data.forEach((item, index) => {
    //   const row = worksheet.addRow([
    //     item.customerName,
    //     item.customerTypeId,
    //     item.phone,
    //     item.address,
    //     item.accountsReceivable,
    //   ]);
    //   row.eachCell((cell, colNumber) => {
    //     cell.border = {
    //       top: {style: 'thin'},
    //       left: {style: 'thin'},
    //       bottom: {style: 'thin'},
    //       right: {style: 'thin'}
    //     };
    //   });
    // });
    //
    // // Lưu workbook và tải xuống tệp Excel
    // workbook.xlsx.writeBuffer().then((buffer) => {
    //   const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    //   saveAs(blob, 'Danh_sách_khách_hàng_' + this.today() + '.xlsx');
    // });
  }
}
