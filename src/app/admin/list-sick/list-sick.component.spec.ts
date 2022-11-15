import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSickComponent } from './list-sick.component';

describe('ListSickComponent', () => {
  let component: ListSickComponent;
  let fixture: ComponentFixture<ListSickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
