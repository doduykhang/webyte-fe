import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicineFormComponent } from './update-medicine-form.component';

describe('UpdateMedicineFormComponent', () => {
  let component: UpdateMedicineFormComponent;
  let fixture: ComponentFixture<UpdateMedicineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMedicineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMedicineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
