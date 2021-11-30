import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PointerEventsSharedService } from '../ponter-events-shared/pointer-events-shared.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerSharedService {

  isLoading = new Subject<boolean>();

  constructor(public pointerEventsService: PointerEventsSharedService) { }

  show() {
    this.isLoading.next(true);
    this.pointerEventsService.disable();
  }
  hide() {
    this.isLoading.next(false);
    this.pointerEventsService.enable();
  }

}
