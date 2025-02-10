import { TestBed } from '@angular/core/testing';

import { CasinofiltersService } from './casinofilters.service';

describe('CasinofiltersService', () => {
  let service: CasinofiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasinofiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
