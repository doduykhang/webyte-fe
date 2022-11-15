import { TestBed } from '@angular/core/testing';

import { MedicineServiceService } from './medicine-service.service';

describe('MedicineServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicineServiceService = TestBed.get(MedicineServiceService);
    expect(service).toBeTruthy();
  });
});
