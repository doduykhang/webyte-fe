import { TestBed } from '@angular/core/testing';

import { TaklService } from './takl.service';

describe('TaklService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaklService = TestBed.get(TaklService);
    expect(service).toBeTruthy();
  });
});
