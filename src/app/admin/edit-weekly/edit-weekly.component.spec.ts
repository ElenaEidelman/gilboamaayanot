import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeeklyComponent } from './edit-weekly.component';

describe('EditWeeklyComponent', () => {
  let component: EditWeeklyComponent;
  let fixture: ComponentFixture<EditWeeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWeeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
