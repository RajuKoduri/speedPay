import { TestBed } from '@angular/core/testing';

import { PreLoginAuthGuardResolverService } from './pre-login-auth-guard-resolver.service';

describe('PreLoginAuthGuardResolverService', () => {
  let service: PreLoginAuthGuardResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreLoginAuthGuardResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
