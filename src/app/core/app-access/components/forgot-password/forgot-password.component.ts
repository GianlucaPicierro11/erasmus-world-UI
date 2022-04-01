import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '@core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from '@core/app-access/services/snackbar/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthHttpService, private snackbarService: SnackbarService) {
    this.form = fb.group({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {

  }

  resetPassword() {
    let email: string = this.form.get("email")?.value;
    console.log(email)
    this.authService.resetPassword(email).subscribe({
      next: (confirmation) => {
        if (confirmation) {
          this.snackbarService.openSuccessSnackBar("We received you reset password request, please check your email to reset your password", "Abbiamo ricevuto la tua richiesta di cambio password, per favore controlla la tua e-mail per poter procedere")
        }
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error)
      },
      complete: () => {
      }
    });

  }
}
