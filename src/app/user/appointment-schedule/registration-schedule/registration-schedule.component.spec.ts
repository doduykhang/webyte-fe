import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationScheduleComponent } from './registration-schedule.component';

describe('RegistrationScheduleComponent', () => {
  let component: RegistrationScheduleComponent;
  let fixture: ComponentFixture<RegistrationScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
