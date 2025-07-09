import { TestBed } from '@angular/core/testing';

import { ServicecompanyService } from './servicecompany.service';

describe('ServicecompanyService', () => {
  let service: ServicecompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicecompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
