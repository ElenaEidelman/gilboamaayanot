import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelButtonComponent } from './excel-button.component';

describe('ExcelButtonComponent', () => {
  let component: ExcelButtonComponent;
  let fixture: ComponentFixture<ExcelButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
