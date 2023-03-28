import { TestBed } from '@angular/core/testing';

import { ServerInformationService } from './server-information.service';

describe('ServerInformationService', () => {
  let service: ServerInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
