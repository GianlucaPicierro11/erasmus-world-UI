import { TestBed } from '@angular/core/testing';

import { SpinnerSharedService } from './spinner-shared.service';

describe('SpinnerSharedService', () => {
  let service: SpinnerSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
