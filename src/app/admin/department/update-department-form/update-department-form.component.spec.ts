import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartmentFormComponent } from './update-department-form.component';

describe('UpdateDepartmentFormComponent', () => {
  let component: UpdateDepartmentFormComponent;
  let fixture: ComponentFixture<UpdateDepartmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDepartmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
