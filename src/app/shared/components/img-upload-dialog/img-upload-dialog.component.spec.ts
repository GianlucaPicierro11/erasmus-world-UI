import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUploadDialogComponent } from './img-upload-dialog.component';

describe('ImgUploadDialogComponent', () => {
  let component: ImgUploadDialogComponent;
  let fixture: ComponentFixture<ImgUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgUploadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
