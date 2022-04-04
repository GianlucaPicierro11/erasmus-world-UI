import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { UserModel } from 'app/core/app-access/models/user.model';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { TokenStorageService } from 'app/core/app-access/services/token-storage/token-storage.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logoPath: string = environment.BASE_URL_UI + 'assets/images/ESN_full-logo-Satellite.png';
  isLoggedIn = false;
  hide = true;
  user$: Observable<UserModel> | undefined;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private authService: AuthHttpService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigateByUrl(RoutesEnum.LOGIN);
    } else {
      this.user$ = this.authService.getUserInfo(this.tokenStorageService.getUser()?.email, this.tokenStorageService.getToken());
    }
  }

}
