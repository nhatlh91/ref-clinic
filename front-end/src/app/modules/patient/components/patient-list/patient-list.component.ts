import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort, MatSortModule} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PatientService} from "../../patient.service";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {AuthService} from "../../../login/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Patient} from "../../models/patient";
import {DialogPatientCreateComponent} from "../dialog-patient-create/dialog-patient-create.component";
import {DialogPatientDetailComponent} from "../dialog-patient-detail/dialog-patient-detail.component";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {
  dataSource = new MatTableDataSource<Patient>();
  displayedColumns: string[] = ['identity', 'patientName', 'gender', 'birthday', 'phone', 'address'];
  role: string;
  fullAccessRole = ['ADMIN', 'RECEPTIONIST'];
  fullAccess = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private patientService: PatientService,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog,) {
    this.role = this.tokenStorageService.getDecryptedRole();
    this.fullAccess = this.fullAccessRole.includes(this.role);
    if (this.fullAccess) this.displayedColumns.push('debt');
  }

  ngOnInit() {
    this.checkToken();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.patientService.getPatients().subscribe({
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

  edit(customerId: number) {
    // this.dialog.open(DialogCustomerEditComponent, {
    //   data: customerId,
    //   width: '60%',
    //   // disableClose: true
    // });
  }

  async delete(customerId: number) {
    // const {value: confirmation} = await Swal.fire({
    //   title: 'Xác nhận thao tác xóa',
    //   input: 'text',
    //   icon: 'warning',
    //   inputPlaceholder: 'Nhập "delete" để xác nhận thao tác xóa',
    //   showCancelButton: true,
    //   confirmButtonText: 'Xác nhận',
    //   cancelButtonText: 'Hủy bỏ',
    // });
    // if (confirmation === 'delete') {
    //   await this.customerService.deleteCustomer(customerId).toPromise();
    //   await Swal.fire({title: `Đã xóa`, icon: 'success', timer: 1000, showConfirmButton: false});
    //   this.customerService.fetchData();
    // } else {
    //   await Swal.fire({title: `Đã hủy thao tác`, icon: 'info', timer: 1000, showConfirmButton: false});
    // }
  }

  updateReceivables(customerId: number) {
    // const dialogRef = this.dialog.open(DialogUpdateReceivablesComponent, {
    //   data: customerId,
    //   width: '60%',
    //   // disableClose: true
    // });
  }

  RecordResultHistory(customerId: number) {
    // const dialogRef = this.dialog.open(DialogPaymentHistoryComponent, {
    //   data: customerId,
    //   width: '60%',
    //   // disableClose: true
    // });
  }

  customerCreate() {
    const dialogRef = this.dialog.open(DialogPatientCreateComponent, {
      width: '60%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      debugger;
      this.patientService.savePatient(next).subscribe(() => {
        this.openSnackBar('Thêm mới thành công!')
        this.ngOnInit();
      });
    })
  }

  detail(patient: Patient) {
    const dialogRef = this.dialog.open(DialogPatientDetailComponent, {
      width: '60%',
      data: patient,
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    })
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Đóng', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
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

  payment(item: Patient) {
    const input = prompt('Nhập số tiền thanh toán:');
    if (input == undefined) return;
    const parsedInput = parseInt(input, 10);
    if (isNaN(parsedInput) || parsedInput <= 0 || parsedInput > item.debt) return;
    debugger;
    this.patientService.debtSubtract(item.patientId, parsedInput)?.subscribe({
      complete: () => {
        this.openSnackBar('Cập nhật thành công');
        this.ngOnInit();
      }
    })
  }
}
