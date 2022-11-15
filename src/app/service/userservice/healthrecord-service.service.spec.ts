import { TestBed } from '@angular/core/testing';

import { HealthrecordServiceService } from './healthrecord-service.service';

describe('HealthrecordServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthrecordServiceService = TestBed.get(HealthrecordServiceService);
    expect(service).toBeTruthy();
  });
});
