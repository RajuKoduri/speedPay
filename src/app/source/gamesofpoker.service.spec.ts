import { TestBed } from '@angular/core/testing';

import { GamesofpokerService } from './gamesofpoker.service';

describe('GamesofpokerService', () => {
  let service: GamesofpokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesofpokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
