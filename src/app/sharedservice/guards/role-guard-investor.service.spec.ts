import { TestBed } from '@angular/core/testing';

import { RoleGuardInvestorService } from './role-guard-investor.service';

describe('RoleGuardInvestorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleGuardInvestorService = TestBed.get(RoleGuardInvestorService);
    expect(service).toBeTruthy();
  });
});
