import { TestBed } from '@angular/core/testing';

import { CommomfilterService } from './commomfilter.service';

describe('CommomfilterService', () => {
  let service: CommomfilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommomfilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
