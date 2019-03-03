import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgalleryComponent } from './editgallery.component';

describe('EditgalleryComponent', () => {
  let component: EditgalleryComponent;
  let fixture: ComponentFixture<EditgalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditgalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
