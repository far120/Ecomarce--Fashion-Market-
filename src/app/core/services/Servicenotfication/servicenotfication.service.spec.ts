import { TestBed } from '@angular/core/testing';

import { ServicenotficationService } from './servicenotfication.service';

describe('ServicenotficationService', () => {
  let service: ServicenotficationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicenotficationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
