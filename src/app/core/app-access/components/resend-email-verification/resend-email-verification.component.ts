import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthHttpService } from '@core/app-access/services/auth-http/auth-http.service';
import { environment } from '@env/environment';
import { SnackbarService } from 'app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-resend-email-verification',
  templateUrl: './resend-email-verification.component.html',
  styleUrls: ['./resend-email-verification.component.css']
})
export class ResendEmailVerificationComponent implements OnInit {

  logoPath: string = environment.BASE_URL_UI + 'assets/images/ME_full.png';
  email: string | null;
  isSendingNewEmail = false;

  constructor(private route: ActivatedRoute, private authService: AuthHttpService, private snackbarService: SnackbarService) {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  ngOnInit(): void {

  }

  resendConfirmEmail() {
    this.isSendingNewEmail = true;
    this.authService.resendConfirmationEmail(this.email).subscribe({
      next: (confirmation) => {
        if (confirmation) {
          this.snackbarService.openSuccessSnackBar("We received your resend confirmation emal request, please check your email", "Abbiamo ricevuto la tua richiesta reinvio dell'email di conferma, per favore controlla la tua e-mail")
        }
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error);
        this.isSendingNewEmail = false;
      },
      complete: () => {
        this.isSendingNewEmail = false;
      }
    });
  }
}
