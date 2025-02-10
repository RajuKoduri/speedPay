import { TestBed } from '@angular/core/testing';

import { TotalSumsService } from './total-sums.service';

describe('TotalSumsService', () => {
  let service: TotalSumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalSumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
