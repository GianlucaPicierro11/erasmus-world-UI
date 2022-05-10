import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '@core/app-access/services/auth-http/auth-http.service';
import { SocialAuthService } from 'angularx-social-login';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { LoginSharedService } from 'app/shared/services/login-shared/login-shared.service';
import { SnackbarService } from 'app/shared/services/snackbar/snackbar.service';
import { TokenStorageService } from 'app/shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  isDeleting: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private authHttpService: AuthHttpService, private snackbarService: SnackbarService,
    private socialAuthService: SocialAuthService, private router: Router,
    public loginSharedService: LoginSharedService) { }

  ngOnInit(): void {
  }

  deleteAccount() {
    this.isDeleting = true
    this.authHttpService.deleteAccount(
      this.tokenStorageService.getUser()?.id!).subscribe(
        {
          next: (data) => {
            if (data) {
              this.socialAuthService.signOut().finally(() => {
                this.tokenStorageService.signOut();
                this.loginSharedService.pushIsLoggedIn(!!this.tokenStorageService.getToken());
                this.loginSharedService.pushIsLoggedOut(!this.tokenStorageService.getToken());
                this.router.navigateByUrl(RoutesEnum.LOGIN);
              });
              this.snackbarService.openSuccessSnackBar("Your account was deleted, we hope to see you soon", "Il tuo account è stato cancellato, speriamo di riverderti presto");
            }
          },
          error: (e) => {
            this.snackbarService.openErrorSnackBar(e.error.error, e.error.error);
            this.isDeleting = false;
          },
          complete: () => {
            this.isDeleting = false;
          }
        }
      )
  }

}
