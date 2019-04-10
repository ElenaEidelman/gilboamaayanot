import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBirthdayComponent } from './edit-birthday.component';

describe('EditBirthdayComponent', () => {
  let component: EditBirthdayComponent;
  let fixture: ComponentFixture<EditBirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
