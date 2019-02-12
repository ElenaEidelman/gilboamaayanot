import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClubAchievementComponent } from './edit-club-achievement.component';

describe('EditClubAchievementComponent', () => {
  let component: EditClubAchievementComponent;
  let fixture: ComponentFixture<EditClubAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClubAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClubAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
