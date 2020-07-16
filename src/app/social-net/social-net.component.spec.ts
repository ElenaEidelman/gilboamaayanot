import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetComponent } from './social-net.component';

describe('SocialNetComponent', () => {
  let component: SocialNetComponent;
  let fixture: ComponentFixture<SocialNetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialNetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
