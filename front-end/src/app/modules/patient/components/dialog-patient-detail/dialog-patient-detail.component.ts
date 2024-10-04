import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Patient} from "../../models/patient";
import {PatientService} from "../../patient.service";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {RecordResultService} from "../../../examination/service/record-result.service";
import {RecordResult} from "../../../examination/models/record-result";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {
  DialogRecordResultUpdateComponent
} from "../../../examination/components/dialog-record-result-update/dialog-record-result-update.component";

@Component({
  selector: 'app-dialog-patient-detail',
  templateUrl: './dialog-patient-detail.component.html',
  styleUrl: './dialog-patient-detail.component.css'
})
export class DialogPatientDetailComponent {
  dataSource = new MatTableDataSource<RecordResult>();
  displayedColumns: string[] = ['createDate', 'diagnose'];
  role = 'USER';
  name?: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<DialogPatientDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Patient,
              private patientService: PatientService,
              private tokenStorageService: TokenStorageService,
              private recordResultService: RecordResultService,
              private dialog: MatDialog) {
    this.role = this.tokenStorageService.getDecryptedRole();
    this.recordResultService.getHistory(data.patientId).subscribe({
      next: value => {
        this.dataSource.data = value;
      }
    });
    this.dataSource.paginator = this.paginator;
  }

  deletePatient() {
    const input = prompt('Nhập "delete" vào ô bên dưới để xác nhận thao tác xóa');
    if (input == "delete") {
      this.patientService.deletePatient(this.data.patientId).subscribe({complete: () => alert('Đã xóa')});
    } else {
      alert('Đã hủy thao tác');
    }
    this.dialogRef.close();
  }

  detail(item: RecordResult) {
    this.dialog.open(DialogRecordResultUpdateComponent, {
      width: '60%',
      data: item,
      // disableClose: true
    });
  }
}
