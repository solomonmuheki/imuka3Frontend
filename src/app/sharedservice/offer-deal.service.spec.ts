import { TestBed } from '@angular/core/testing';

import { OfferDealService } from './offer-deal.service';

describe('OfferDealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferDealService = TestBed.get(OfferDealService);
    expect(service).toBeTruthy();
  });
});
