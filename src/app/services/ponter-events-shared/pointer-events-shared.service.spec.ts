import { TestBed } from '@angular/core/testing';

import { PointerEventsSharedService } from './pointer-events-shared.service';

describe('PointerEventsSharedService', () => {
  let service: PointerEventsSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointerEventsSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
