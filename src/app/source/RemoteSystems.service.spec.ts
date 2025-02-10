/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemoteSystemsService } from './RemoteSystems.service';

describe('Service: RemoteSystems', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteSystemsService]
    });
  });

  it('should ...', inject([RemoteSystemsService], (service: RemoteSystemsService) => {
    expect(service).toBeTruthy();
  }));
});
