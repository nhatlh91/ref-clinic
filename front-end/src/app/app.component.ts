import {Component, signal} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-gamma-angular-v17';
  imageUrl = `https://placehold.co/${250}X${250}`
  uploading = signal(false);
  height = signal(250);
  width = signal(250);

  constructor(private storage: AngularFireStorage,) {
  }

  async onFileSelected(event: any) {
    this.uploading.set(true);
    const file: File = event.target.files[0];
    const folderPath = 'images/result'; // Thay đổi thư mục tải lên
    const fileName = `${file.name}`; // Tên tệp tin tải lên
    const fileRef = this.storage.ref(`${folderPath}/${fileName}`);

    await this.storage.upload(`${folderPath}/${fileName}`, file);
    fileRef.getDownloadURL().subscribe(url => this.imageUrl = url)
    // this.employeeEditForm.patchValue({employeeImg: url});
    this.uploading.set(false);
  }
}
