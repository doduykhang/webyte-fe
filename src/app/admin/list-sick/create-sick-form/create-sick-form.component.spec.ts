import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSickFormComponent } from './create-sick-form.component';

describe('CreateSickFormComponent', () => {
  let component: CreateSickFormComponent;
  let fixture: ComponentFixture<CreateSickFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSickFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSickFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
