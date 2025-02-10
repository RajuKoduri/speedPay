import { TestBed } from '@angular/core/testing';

import { FileformatServiceService } from './fileformat-service.service';

describe('FileformatServiceService', () => {
  let service: FileformatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileformatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
