import { TestBed } from '@angular/core/testing';

import { ErrorSharedService } from './error-shared.service';

describe('ErrorSharedService', () => {
  let service: ErrorSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
