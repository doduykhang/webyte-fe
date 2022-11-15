import { TestBed } from '@angular/core/testing';

import { SickServiceService } from './sick-service.service';

describe('SickServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SickServiceService = TestBed.get(SickServiceService);
    expect(service).toBeTruthy();
  });
});
