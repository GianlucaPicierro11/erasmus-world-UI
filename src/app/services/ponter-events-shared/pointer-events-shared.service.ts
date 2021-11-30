import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointerEventsSharedService {

  enablePointerEvents = new Subject<boolean>();
  enablePointerEvents$ = this.enablePointerEvents.asObservable();
  constructor() { }

  enable() {
    this.enablePointerEvents.next(true);
  }
  disable() {
    this.enablePointerEvents.next(false);
  }

}
