import { TestBed } from '@angular/core/testing';

import { AccountsControllerService } from './accounts-controller.service';

describe('AccountsControllerService', () => {
  let service: AccountsControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
