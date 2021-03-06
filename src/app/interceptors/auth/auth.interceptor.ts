import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from 'app/shared/services/token-storage/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        "X-Requested-With": "XMLHttpRequest",
      }
    });
    const token = this.token.getToken();
    if (token != null) {
      req = req.clone({ headers: req.headers.append(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];