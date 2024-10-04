import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {ExportVoucher, ExportVoucherDetail} from "../../models/item";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ItemService} from "../../services/item.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {PatientService} from "../../../patient/patient.service";
import {Patient} from "../../../patient/models/patient";

@Component({
  selector: 'app-dialog-export-voucher-detail',
  templateUrl: './dialog-export-voucher-detail.component.html',
  styleUrl: './dialog-export-voucher-detail.component.css'
})
export class DialogExportVoucherDetailComponent {
  day: string;
  month: string;
  year: number;
  details: ExportVoucherDetail[];
  patient: Patient;

  @ViewChild('htmlContent') htmlContent!: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public voucher: ExportVoucher,
              private itemService: ItemService,
              private patientService: PatientService) {
    this.itemService.getExportVoucherDetails(voucher.exportVoucherId).subscribe({
      next: value => this.details = value,
      error: err => alert(err)
    });
    this.patientService.getPatientById(voucher.patientId).subscribe({
      next: value => this.patient = value
    })
    this.getDate();
  }

  getDate() {
    const voucherCreateDate = this.voucher.createDate?.toString() || '';
    const [year, month, day] = voucherCreateDate.split('-');
    this.year = parseInt(year, 10);
    this.month = String(parseInt(month, 10)).padStart(2, '0');
    this.day = String(parseInt(day, 10)).padStart(2, '0');
  }


  onPrintClicked() {
    // const element = document.getElementById('content') as HTMLElement;
    html2canvas(this.htmlContent.nativeElement, {
      scale: 5,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const width = pdfWidth;
      const height = width / ratio;

      const margin = 5;
      const marginLeft = margin;
      const marginRight = pdfWidth - margin;
      const marginTop = margin;
      const marginBottom = pdfHeight - margin;

      // pdf.setLineWidth(0.1);
      pdf.setDrawColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.rect(marginLeft, marginTop, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
      pdf.addImage(imgData, 'PNG', marginLeft, marginTop, width - 2 * margin, height - 2 * margin);

      const pdfOutput = pdf.output('bloburl');
      // pdf.save('my-document.pdf');
      const newWindow = window.open();
      if (newWindow) {
        // @ts-ignore
        newWindow.location.href = pdfOutput;
      } else {
        alert('Please allow popups for this website');
      }
    });
  }
}
