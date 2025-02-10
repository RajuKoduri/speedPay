import { TestBed } from '@angular/core/testing';

import { CreatePokerSatelliteSeriesService } from './create-poker-satellite-series.service';

describe('CreatePokerSatelliteSeriesService', () => {
  let service: CreatePokerSatelliteSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePokerSatelliteSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
