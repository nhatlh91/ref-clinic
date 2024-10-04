import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../../modules/login/services/token-storage.service";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {PopupSpinnerComponent} from "../popup-spinner/popup-spinner.component";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isHidden = false;
  decryptedRole = '';
  decryptedName = 'Khách';
  showChildComponent = false;
  dialogRef: any;
  decrypted: any;
  currentDate: string;

  constructor(private dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

        // let timerInterval: string | number | NodeJS.Timeout | undefined;
        // Swal.fire({
        //   title: "Đang tải dữ liệu!!",
        //   html: "Thời gian còn lại: <b></b> ms.",
        //   timer: 500,
        //   timerProgressBar: true,
        //   didOpen: () => {
        //     Swal.showLoading();
        //     const timerElement = Swal.getPopup()?.querySelector("b");
        //     if (timerElement) {
        //       timerInterval = setInterval(() => {
        //         timerElement.textContent = `${Swal.getTimerLeft()}`;
        //       }, 100);
        //     }
        //   },
        //   willClose: () => {
        //     if (timerInterval) {
        //       clearInterval(timerInterval);
        //     }
        //   }
        // }).then((result) => {
        //   if (result.dismiss === Swal.DismissReason.timer) {
        //     console.log("I was closed by the timer");
        //   }
        // });

      } else if (event instanceof NavigationEnd) {
        this.showChildComponent = true;
      }
    });
  }

  ngOnInit() {
    this.getRole();
    this.getName();
    this.getJson();

    this.updateCurrentDate();
    setInterval(() => {
      this.updateCurrentDate();
    }, 1000); // Cập nhật ngày giờ mỗi giây
  }

  updateCurrentDate() {
    this.currentDate = new Date().toLocaleString();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(PopupSpinnerComponent, {
      disableClose: true // Ngăn người dùng đóng dialog
    });
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  toggleSidebar() {
    this.isHidden = !this.isHidden;
  }

  getRole() {
    if (this.tokenStorageService.getRole()) {
      this.decryptedRole = this.tokenStorageService.getDecryptedRole();
    }
  }

  getName() {
    if (this.tokenStorageService.getToken()) {
      this.decryptedName = this.tokenStorageService.getDecryptedName();
    }
  }

  getCurrentUrl() {
    return this.route.snapshot.url.map(segment => segment.path).join('/');
  }

  private getJson() {
    if (this.tokenStorageService.getAccessJson()) {
      this.decrypted = this.tokenStorageService.getAccessJson();
    }
  }
}
