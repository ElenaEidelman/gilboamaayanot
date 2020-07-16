import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerLinkComponent } from './inner-link.component';

describe('InnerLinkComponent', () => {
  let component: InnerLinkComponent;
  let fixture: ComponentFixture<InnerLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
