import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentFormComponent } from './create-department-form.component';

describe('CreateDepartmentFormComponent', () => {
  let component: CreateDepartmentFormComponent;
  let fixture: ComponentFixture<CreateDepartmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDepartmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
