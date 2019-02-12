import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogaddmenuComponent } from './dialogaddmenu.component';

describe('DialogaddmenuComponent', () => {
  let component: DialogaddmenuComponent;
  let fixture: ComponentFixture<DialogaddmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogaddmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogaddmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
