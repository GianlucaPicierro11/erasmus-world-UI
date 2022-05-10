import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '@core/app-access/models/user.model';
import { AuthHttpService } from '@core/app-access/services/auth-http/auth-http.service';
import { ImgUploadDialogDataModel } from 'app/shared/models/img-upload-dialog-data.model';
import { TokenStorageService } from 'app/shared/services/token-storage/token-storage.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-img-upload-dialog',
  templateUrl: './img-upload-dialog.component.html',
  styleUrls: ['./img-upload-dialog.component.css']
})
export class ImgUploadDialogComponent {

  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  image: any = '';
  @ViewChild('input') inputFile: ElementRef | undefined;
  user!: UserModel;

  constructor(
    public dialogRef: MatDialogRef<ImgUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImgUploadDialogDataModel,
    private authHttpService: AuthHttpService, private authService: AuthHttpService, private tokenStorageService: TokenStorageService
  ) {
    this.image = data.image;
    this.dialogRef.backdropClick().subscribe(() => this.dialogRef.close(this.image));
    this.authService.getUserInfo(this.tokenStorageService.getUser()?.email,
      this.tokenStorageService.getToken()).subscribe(user => this.user = user);
  }

  clickFileInput() {
    let el: HTMLElement = this.inputFile?.nativeElement;
    el.click();
  }

  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }

  imgLoad() {
    // display cropper tool
  }

  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

  removeCurrentPhoto() {
    const formData = new FormData();
    formData.append("userEmail", this.user?.email);
    this.authHttpService.removeProfilePhoto(formData).subscribe();
    this.image = '';
    this.dialogRef.close(this.image);
  }

  onCancelClick(): void {
    this.dialogRef.close(this.image);
  }

  onOkClick(): void {
    this.image = this.cropImgPreview;
    const formData = new FormData();
    formData.append("userEmail", this.user?.email);
    formData.append("photo", this.image);
    this.authHttpService.saveProfilePhoto(formData).subscribe();
    this.dialogRef.close(this.image);
  }
}

