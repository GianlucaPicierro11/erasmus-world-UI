import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from 'app/enumerations/routes.enum';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/services/auth/auth.service';
import { TokenStorageService } from 'app/services/token-storage/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  hide = true;
  user$: Observable<UserModel> | undefined;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigateByUrl(RoutesEnum.LOGIN);
    } else {
      this.user$ = this.authService.getUserInfo(this.tokenStorageService.getUser()?.email, this.tokenStorageService.getToken());
    }
  }

}
