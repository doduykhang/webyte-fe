import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicineFormComponent } from './create-medicine-form.component';

describe('CreateMedicineFormComponent', () => {
  let component: CreateMedicineFormComponent;
  let fixture: ComponentFixture<CreateMedicineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMedicineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedicineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
