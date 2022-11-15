import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorFormComponent } from './update-doctor-form.component';

describe('UpdateDoctorFormComponent', () => {
  let component: UpdateDoctorFormComponent;
  let fixture: ComponentFixture<UpdateDoctorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDoctorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDoctorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
