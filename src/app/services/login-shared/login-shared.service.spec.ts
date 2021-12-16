import { TestBed } from '@angular/core/testing';

import { LoginSharedService } from './login-shared.service';

describe('LoginSharedService', () => {
  let service: LoginSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
