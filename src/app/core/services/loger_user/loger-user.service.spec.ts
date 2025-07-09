import { TestBed } from '@angular/core/testing';

import { LogerUserService } from './loger-user.service';

describe('LogerUserService', () => {
  let service: LogerUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogerUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
