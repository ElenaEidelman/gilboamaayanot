import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlanksComponent } from './blanks.component';

describe('BlanksComponent', () => {
  let component: BlanksComponent;
  let fixture: ComponentFixture<BlanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
