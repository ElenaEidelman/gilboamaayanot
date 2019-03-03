import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WysiwygfrontComponent } from './wysiwygfront.component';

describe('WysiwygComponent', () => {
  let component: WysiwygfrontComponent;
  let fixture: ComponentFixture<WysiwygfrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WysiwygfrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WysiwygfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
