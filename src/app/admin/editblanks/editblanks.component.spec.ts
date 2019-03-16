import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditblanksComponent } from './editblanks.component';

describe('EditblanksComponent', () => {
  let component: EditblanksComponent;
  let fixture: ComponentFixture<EditblanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditblanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditblanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
