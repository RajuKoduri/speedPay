import { TestBed } from '@angular/core/testing';

import { PostloginPostloginauthguardServiceService } from './postlogin-postloginauthguard-service.service';

describe('PostloginPostloginauthguardServiceService', () => {
  let service: PostloginPostloginauthguardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostloginPostloginauthguardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
