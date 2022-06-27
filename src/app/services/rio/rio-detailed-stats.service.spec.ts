import { TestBed } from '@angular/core/testing';

import { RioDetailedStatsService } from './rio-detailed-stats.service';

describe('RioDetailedStatsService', () => {
  let service: RioDetailedStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RioDetailedStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
