import { TestBed } from '@angular/core/testing';

import { TypologicalHttpService } from './typological-http.service';

describe('TypologicalService', () => {
  let service: TypologicalHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypologicalHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
