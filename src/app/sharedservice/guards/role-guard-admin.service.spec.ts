import { TestBed } from '@angular/core/testing';

import { RoleGuardAdminService } from './role-guard-admin.service';

describe('RoleGuardAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleGuardAdminService = TestBed.get(RoleGuardAdminService);
    expect(service).toBeTruthy();
  });
});
