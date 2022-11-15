import { TestBed } from '@angular/core/testing';

import { DutyScheduleService } from './duty-schedule.service';

describe('DutyScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DutyScheduleService = TestBed.get(DutyScheduleService);
    expect(service).toBeTruthy();
  });
});
