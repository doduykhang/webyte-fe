import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskAnswerComponent } from './ask-answer.component';

describe('AskAnswerComponent', () => {
  let component: AskAnswerComponent;
  let fixture: ComponentFixture<AskAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
