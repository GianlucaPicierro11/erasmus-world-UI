import { TestBed } from '@angular/core/testing';

import { LocaleLanguageService } from './locale-language.service';

describe('LocaleLanguageService', () => {
  let service: LocaleLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
