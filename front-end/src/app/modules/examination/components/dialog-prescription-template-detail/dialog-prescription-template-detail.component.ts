import {Component, Inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Prescription, PrescriptionTemplate, RecordResult} from "../../models/record-result";
import {MatPaginator} from "@angular/material/paginator";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {PrescriptionTemplateService} from "../../service/prescription-template.service";
import {AuthService} from "../../../login/services/auth.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog-prescription-template-detail',
  templateUrl: './dialog-prescription-template-detail.component.html',
  styleUrl: './dialog-prescription-template-detail.component.css'
})
export class DialogPrescriptionTemplateDetailComponent {
  dataSource = new MatTableDataSource<Prescription>();
  displayedColumns: string[] = ['name', 'unit', 'description', 'morning', 'lunch', 'afternoon', 'night', 'days'];

  constructor(private prescriptionTemplateService: PrescriptionTemplateService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: PrescriptionTemplate,) {
    this.prescriptionTemplateService.getTemplateDetailById(this.data.prescriptionTemplateId).subscribe({
      next: value => this.dataSource.data = value,
      error: err => {
        this.openSnackBar('Có lỗi xảy ra trong quá trình truy vấn dữ liệu. Xin thử lại');
        this.dataSource.data = [];
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Đóng', {
      duration: 3000, // (ms)
      horizontalPosition: 'center', // (start, center, end)
      verticalPosition: 'top', // (top, bottom)
    });
  }
}
