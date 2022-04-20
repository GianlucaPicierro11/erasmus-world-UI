import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from 'app/shared/services/snackbar/snackbar.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {

  logoPath: string = environment.BASE_URL_UI + 'assets/images/ME_full.png';
  user!: string | null;
  token!: string | null;
  confirmation: Subject<boolean> = new BehaviorSubject<boolean>(false);
  confirmation$ = this.confirmation.asObservable();
  isResendConfirmationEmail: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthHttpService, private snackbarService: SnackbarService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('user');
    this.token = this.route.snapshot.paramMap.get('token');
    this.authService.confirm(this.user, this.token).subscribe({
      next: (confirmation) => {
        if (confirmation) {
          this.confirmation.next(confirmation != null || confirmation != undefined);
          this.snackbarService.openSuccessSnackBar("Registration confirmed", "Registrazione confermata")
          this.router.navigateByUrl(RoutesEnum.LOGIN);
        }
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error)
      },
      complete: () => {
        this.router.navigateByUrl(RoutesEnum.LOGIN);
      }
    });
  }

  goToLogin() {
    this.router.navigateByUrl(RoutesEnum.LOGIN);
  }

  resendConfirmationEmail() {
    this.isResendConfirmationEmail = true;
    this.authService.resendConfirmationEmail(this.user).subscribe({
      next: (confirmation) => {
        if (confirmation) {
          this.snackbarService.openSuccessSnackBar("We received your resend confirmation emal request, please check your email", "Abbiamo ricevuto la tua richiesta reinvio dell'email di conferma, per favore controlla la tua e-mail")
        }
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error);
        this.isResendConfirmationEmail = false;
      },
      complete: () => {
        this.isResendConfirmationEmail = false;
      }
    });
  }
}
