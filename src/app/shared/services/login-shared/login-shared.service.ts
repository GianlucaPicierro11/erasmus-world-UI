import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSharedService {

  constructor() { }

  private isLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  pushIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

  private isLoggedOut: Subject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedOut$ = this.isLoggedOut.asObservable();

  pushIsLoggedOut(isLoggedOut: boolean) {
    this.isLoggedOut.next(isLoggedOut);
  }


}
