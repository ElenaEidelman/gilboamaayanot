import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindasboardComponent } from './admindasboard.component';

describe('AdmindasboardComponent', () => {
  let component: AdmindasboardComponent;
  let fixture: ComponentFixture<AdmindasboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindasboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
