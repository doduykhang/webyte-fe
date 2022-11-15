import { TestBed } from '@angular/core/testing';

import { AnswerserviceService } from './answerservice.service';

describe('AnswerserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnswerserviceService = TestBed.get(AnswerserviceService);
    expect(service).toBeTruthy();
  });
});
