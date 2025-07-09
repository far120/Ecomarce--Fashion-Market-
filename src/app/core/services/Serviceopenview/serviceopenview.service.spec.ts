import { TestBed } from '@angular/core/testing';

import { ServiceopenviewService } from './serviceopenview.service';

describe('ServiceopenviewService', () => {
  let service: ServiceopenviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceopenviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
