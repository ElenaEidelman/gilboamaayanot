import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WysiwysComponent } from './wysiwys.component';

describe('WysiwysComponent', () => {
  let component: WysiwysComponent;
  let fixture: ComponentFixture<WysiwysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WysiwysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WysiwysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
