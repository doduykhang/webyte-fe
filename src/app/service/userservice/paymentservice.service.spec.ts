import { TestBed } from '@angular/core/testing';

import { PaymentserviceService } from './paymentservice.service';

describe('PaymentserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentserviceService = TestBed.get(PaymentserviceService);
    expect(service).toBeTruthy();
  });
});
