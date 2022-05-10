import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '@core/app-access/models/user.model';
import { AuthHttpService } from '@core/app-access/services/auth-http/auth-http.service';
import { TokenStorageService } from 'app/shared/services/token-storage/token-storage.service';
import { Observable } from 'rxjs';
import { ImgUploadDialogComponent } from '../img-upload-dialog/img-upload-dialog.component';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent implements OnInit {

  @Input() color: string | undefined;

  image: any;
  user$: Observable<UserModel> | undefined;

  constructor(public dialog: MatDialog, private authService: AuthHttpService, private tokenStorageService: TokenStorageService) {
    authService.getUserInfo(
      this.tokenStorageService.getUser()?.email,
      this.tokenStorageService.getToken()).subscribe(
        user => { this.image = user.photoProfileUrl; }
      )
  }

  ngOnInit(): void {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImgUploadDialogComponent, {
      width: '250px',
      data: { image: this.image },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.image = result;
    });
  }



}

