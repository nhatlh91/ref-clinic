import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../../login/services/token-storage.service";
import {RegistrationService} from "../../service/registration.service";
import {Registration, RegistrationDetail} from "../../models/registration";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dialog-registration-detail',
  templateUrl: './dialog-registration-detail.component.html',
  styleUrl: './dialog-registration-detail.component.css'
})
export class DialogRegistrationDetailComponent {
  role?: string;
  details?: RegistrationDetail[];

  @ViewChild('htmlContent') htmlContent!: ElementRef;

  constructor(public dialogRef: MatDialogRef<DialogRegistrationDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Registration,
              private registrationService: RegistrationService,
              private tokenStorageService: TokenStorageService) {
    this.role = this.tokenStorageService.getDecryptedRole();
    this.registrationService.getRegistrationDetails(data.registrationId).subscribe({
      next: value => {
        this.data.services = value;
      }
    })
  }

  close() {
    this.registrationService.closeRegistration(this.data.registrationId).subscribe({
      error: err => alert(err.status),
      complete: () => alert('Thao tác thành công')
    });
  }

  printInvoice() {
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
        alert('Hãy cho phép bật popup với trang web này!');
      }
    });
  }
}
