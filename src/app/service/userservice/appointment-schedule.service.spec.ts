import { TestBed } from '@angular/core/testing';

import { AppointmentScheduleService } from './appointment-schedule.service';

describe('AppointmentScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentScheduleService = TestBed.get(AppointmentScheduleService);
    expect(service).toBeTruthy();
  });
});
