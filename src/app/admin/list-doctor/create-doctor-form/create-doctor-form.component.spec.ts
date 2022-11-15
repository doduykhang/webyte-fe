import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoctorFormComponent } from './create-doctor-form.component';

describe('CreateDoctorFormComponent', () => {
  let component: CreateDoctorFormComponent;
  let fixture: ComponentFixture<CreateDoctorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDoctorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDoctorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
