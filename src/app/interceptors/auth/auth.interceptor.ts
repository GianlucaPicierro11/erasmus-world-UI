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
        "Permissions-Policy": "camera=*,geolocation=*,microphone=*,autoplay=*,fullscreen=*,picture-in-picture=*,sync-xhr=*,encrypted-media=*,oversized-images=*",
        "Strict-Transport-Security": "max-age=31536000; includeSubdomains",
        "X-Frame-Options": "SAMEORIGIN",
        "X-Content-Type-Options": "nosniff",
        "X-Xss-Protection": "1; mode=block",
        "Content-Security-Policy": "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://stackpath.bootstrapcdn.com https://code.jquery.com https://cdnjs.com https://cdnjs.cloudflare.com; " +
          "style-src 'self' 'unsafe-inline' 'unsafe-eval' fonts.gstatic.com fonts.googleapis.com https://stackpath.bootstrapcdn.com https://use.fontawesome.com;" +
          "object-src 'none';" +
          "img-src 'self' data: blob:;" +
          "font-src 'self' data: https://use.fontawesome.com fonts.gstatic.com fonts.googleapis.com ;"
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