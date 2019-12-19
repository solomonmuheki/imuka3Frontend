import { TestBed } from '@angular/core/testing';

import { DealRegistrationApiService } from './deal-registration-api.service';

describe('DealRegistrationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealRegistrationApiService = TestBed.get(DealRegistrationApiService);
    expect(service).toBeTruthy();
  });
});
