import { TestBed } from '@angular/core/testing';

import { EmployeeSharedService } from './employee-shared.service';

describe('EmployeeSharedService', () => {
  let service: EmployeeSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
