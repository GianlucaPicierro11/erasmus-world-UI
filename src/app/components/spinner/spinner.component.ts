import { Component, OnInit } from '@angular/core';
import { ErrorSharedService } from 'app/services/error-shared/error-shared.service';
import { SpinnerSharedService } from 'app/services/spinner-shared/spinner-shared.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  isLoading: Subject<boolean> = this.spinnerSharedService.isLoading;

  constructor(private spinnerSharedService: SpinnerSharedService, private errorSharedService: ErrorSharedService) {
    this.errorSharedService.error$.subscribe((result: any) => {
      if (result) {
        this.spinnerSharedService.hide();
      }
    });
  }

  ngOnInit() {
  }

}
