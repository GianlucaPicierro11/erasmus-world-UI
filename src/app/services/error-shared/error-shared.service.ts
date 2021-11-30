import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorSharedService {

  constructor() { }

  private error: Subject<boolean> = new BehaviorSubject<boolean>(false);
  error$ = this.error.asObservable();

  pushError(error: boolean) {
    this.error.next(error);
  }

}
