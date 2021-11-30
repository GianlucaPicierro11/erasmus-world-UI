import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { delay, finalize, Observable, timeout } from 'rxjs';
import { SpinnerSharedService } from 'app/services/spinner-shared/spinner-shared.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  totalRequests = 0;

  constructor(public spinnerSharedService: SpinnerSharedService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //è stato aggiunto il setTimeout per risolvere l'errore "ExpressionChangedAfterItHasBeenCheckedError"
    setTimeout(() => {
      //attivo lo spinner
      this.spinnerSharedService.show();
      //per ogni chiamata http fatta, aggiungo uno
      this.totalRequests++;
    });

    return next.handle(request).pipe(
      timeout(60000),
      delay(300),
      finalize(() => {
        setTimeout(() => {
          //per ogni chiamata http terminata, sottraggo uno
          this.totalRequests--;
          if (this.totalRequests == 0) {
            //quando sono terminate tutte le chiamate http nascondo lo spinner
            this.spinnerSharedService.hide();
          }
        });
      })
    );
  }
}

export const spinnerInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
];