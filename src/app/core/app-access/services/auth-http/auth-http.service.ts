import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { LoginModel } from 'app/core/app-access/models/login-request.model';
import { SignupRequestModel } from 'app/core/app-access/models/signup-request.model';
import { JwtResponseModel } from 'app/core/app-access/models/jwt-response.model';
import { UserModel } from 'app/core/app-access/models/user.model';
import { NewPasswordRequestModel } from '@core/app-access/models/new-password-request.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient) { }

  login(loginRequest: LoginModel): Observable<JwtResponseModel> {
    return this.http.post<JwtResponseModel>(environment.AUTH_API + 'signin', loginRequest, httpOptions);
  }

  register(signupRequest: SignupRequestModel): Observable<any> {
    return this.http.post(environment.AUTH_API + 'signup', signupRequest, httpOptions);
  }

  confirm(user: string | null, token: string | null) {
    let params;
    if (user != null && token != null) {
      params = new HttpParams().set("user", user);
      params = params.set("token", token)
    }
    return this.http.get(environment.AUTH_API + 'signin/confirm', { params });
  }

  getUserInfo(user: string | undefined, token: string | null): Observable<UserModel> {
    let params;
    if (user != null && token != null) {
      params = new HttpParams().set("user", user);
      params = params.set("token", token)
    }
    return this.http.get<UserModel>(environment.AUTH_API + 'get-user-info', { params });
  }

  resetPassword(email: string): Observable<JwtResponseModel> {
    return this.http.post<JwtResponseModel>(environment.AUTH_API + 'reset-password', email, httpOptions);
  }

  saveNewPassword(newPasswordRequest: NewPasswordRequestModel): Observable<JwtResponseModel> {
    return this.http.post<JwtResponseModel>(environment.AUTH_API + 'save-new-password', newPasswordRequest, httpOptions);
  }
}