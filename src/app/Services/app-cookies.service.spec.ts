import { TestBed } from '@angular/core/testing';

import { AppCookiesService } from './app-cookies.service';

describe('AppCookiesService', () => {
  let service: AppCookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCookiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
