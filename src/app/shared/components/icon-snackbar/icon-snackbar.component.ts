import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarTypeEnum } from 'app/shared/enumerations/snakbar-type.enum';

@Component({
  selector: 'app-icon-snackbar',
  templateUrl: './icon-snackbar.component.html',
  styleUrls: ['./icon-snackbar.component.css']
})
export class IconSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<IconSnackbarComponent>) { }

  ngOnInit(): void {
  }

  isSuccessSnackBar(): boolean {
    return this.data.type === SnackBarTypeEnum.SUCCESS;
  }

  isWarnSnackBar(): boolean {
    return this.data.type === SnackBarTypeEnum.WARN;
  }

  isErrorSnackBar(): boolean {
    return this.data.type === SnackBarTypeEnum.ERROR;
  }

  isInfoSnackBar(): boolean {
    return this.data.type === SnackBarTypeEnum.INFO;
  }
}
