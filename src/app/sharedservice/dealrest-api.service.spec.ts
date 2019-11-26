import { TestBed } from '@angular/core/testing';

import { DealrestApiService } from './dealrest-api.service';

describe('DealrestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealrestApiService = TestBed.get(DealrestApiService);
    expect(service).toBeTruthy();
  });
});
