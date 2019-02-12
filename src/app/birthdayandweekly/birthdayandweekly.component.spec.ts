import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayandweeklyComponent } from './birthdayandweekly.component';

describe('BirthdayandweeklyComponent', () => {
  let component: BirthdayandweeklyComponent;
  let fixture: ComponentFixture<BirthdayandweeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdayandweeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayandweeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
