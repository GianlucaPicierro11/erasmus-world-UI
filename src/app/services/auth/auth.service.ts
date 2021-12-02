import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { LoginModel } from 'app/models/login-request.model';
import { SignupRequestModel } from 'app/models/signup-request.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(loginRequest: LoginModel): Observable<any> {
    return this.http.post(environment.AUTH_API + 'signin', loginRequest, httpOptions);
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
}