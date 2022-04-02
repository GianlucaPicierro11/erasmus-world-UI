import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsLanguageSelectComponent } from './flags-language-select.component';

describe('FlagsLanguageSelectComponent', () => {
  let component: FlagsLanguageSelectComponent;
  let fixture: ComponentFixture<FlagsLanguageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlagsLanguageSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsLanguageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
