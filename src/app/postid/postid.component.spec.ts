import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostidComponent } from './postid.component';

describe('PostidComponent', () => {
  let component: PostidComponent;
  let fixture: ComponentFixture<PostidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
