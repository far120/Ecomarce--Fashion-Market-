import { TestBed } from '@angular/core/testing';

import { ServiceUSerService } from './service-user.service';

describe('ServiceUSerService', () => {
  let service: ServiceUSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
