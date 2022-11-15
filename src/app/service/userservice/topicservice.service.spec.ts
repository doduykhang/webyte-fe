import { TestBed } from '@angular/core/testing';

import { TopicserviceService } from './topicservice.service';

describe('TopicserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicserviceService = TestBed.get(TopicserviceService);
    expect(service).toBeTruthy();
  });
});
