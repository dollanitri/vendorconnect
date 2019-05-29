import { TestBed } from '@angular/core/testing';

import { VendorProductsService } from './vendor-products.service';

describe('VendorProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorProductsService = TestBed.get(VendorProductsService);
    expect(service).toBeTruthy();
  });
});
