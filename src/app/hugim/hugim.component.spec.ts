import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HugimComponent } from './hugim.component';

describe('HugimComponent', () => {
  let component: HugimComponent;
  let fixture: ComponentFixture<HugimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HugimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HugimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
