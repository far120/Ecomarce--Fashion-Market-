import { TestBed } from '@angular/core/testing';

import { ServicewishlistService } from './servicewishlist.service';

describe('ServicewishlistService', () => {
  let service: ServicewishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicewishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
