import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSickFormComponent } from './update-sick-form.component';

describe('UpdateSickFormComponent', () => {
  let component: UpdateSickFormComponent;
  let fixture: ComponentFixture<UpdateSickFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSickFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSickFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
