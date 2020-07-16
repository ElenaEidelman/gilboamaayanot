import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutLinkComponent } from './out-link.component';

describe('OutLinkComponent', () => {
  let component: OutLinkComponent;
  let fixture: ComponentFixture<OutLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
