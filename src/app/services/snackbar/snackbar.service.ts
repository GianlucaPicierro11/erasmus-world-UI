import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSuccessSnackBar(message: string) {
    this.openSnackbar(message, 'snackbarSuccess', 5000);
  }

  openErrorSnackBar(message: string) {
    this.openSnackbar(message, 'snackbarError', 5000);
  }

  openInfoSnackWarn(message: string) {
    this.openSnackbar(message, 'snackbarWarn', 5000);
  }

  private openSnackbar(message: string, panelClass: string, duration: number) {
    this._snackBar.open(message, "X", {
      duration: duration,
      panelClass: panelClass,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
