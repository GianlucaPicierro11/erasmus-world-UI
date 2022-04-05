import { TestBed } from '@angular/core/testing';

import { TypologicalService } from './typological.service';

describe('TypologicalService', () => {
  let service: TypologicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypologicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
