import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHttpService } from '@core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from 'app/shared/services/snackbar/snackbar.service';
import { environment } from '@env/environment';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  logoPath: string = environment.BASE_URL_UI + 'assets/images/ESN_full-logo-Satellite.png';

  constructor(private fb: FormBuilder, private authService: AuthHttpService, private snackbarService: SnackbarService, private router: Router) {
    this.form = fb.group({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {

  }

  goToLogin() {
    this.router.navigateByUrl(RoutesEnum.LOGIN);
  }

  goToRegistration() {
    this.router.navigateByUrl(RoutesEnum.REGISTER)
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
