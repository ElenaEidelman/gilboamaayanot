import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubachievementComponent } from './clubachievement.component';

describe('ClubachievementComponent', () => {
  let component: ClubachievementComponent;
  let fixture: ComponentFixture<ClubachievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubachievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubachievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
