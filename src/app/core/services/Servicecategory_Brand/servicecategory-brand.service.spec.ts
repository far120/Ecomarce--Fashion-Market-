import { TestBed } from '@angular/core/testing';

import { ServicecategoryBrandService } from './servicecategory-brand.service';

describe('ServicecategoryBrandService', () => {
  let service: ServicecategoryBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicecategoryBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
