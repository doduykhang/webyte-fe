import { TestBed } from '@angular/core/testing';

import { SickService } from './sick.service';

describe('SickService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SickService = TestBed.get(SickService);
    expect(service).toBeTruthy();
  });
});
