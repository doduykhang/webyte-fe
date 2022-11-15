import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListASComponent } from './list-as.component';

describe('ListASComponent', () => {
  let component: ListASComponent;
  let fixture: ComponentFixture<ListASComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListASComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListASComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
