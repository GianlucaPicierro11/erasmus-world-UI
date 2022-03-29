import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from 'app/core/app-access/services/snackbar/snackbar.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {
  user!: string | null;
  token!: string | null;
  confirmation: Subject<boolean> = new BehaviorSubject<boolean>(false);
  confirmation$ = this.confirmation.asObservable();

  constructor(private route: ActivatedRoute, private authService: AuthHttpService, private snackbarService: SnackbarService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('user');
    this.token = this.route.snapshot.paramMap.get('token');
    this.authService.confirm(this.user, this.token).subscribe({
      next: (confirmation) => {
        if (confirmation) {
          this.confirmation.next(confirmation != null || confirmation != undefined);
          this.snackbarService.openSuccessSnackBar("Registration confirmed")
          this.router.navigateByUrl(RoutesEnum.LOGIN);
        }
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error)
      },
      complete: () => {
        this.router.navigateByUrl(RoutesEnum.LOGIN);
      }
    });
  }

}
