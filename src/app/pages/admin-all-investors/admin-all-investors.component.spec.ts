import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllInvestorsComponent } from './admin-all-investors.component';

describe('AdminAllInvestorsComponent', () => {
  let component: AdminAllInvestorsComponent;
  let fixture: ComponentFixture<AdminAllInvestorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllInvestorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
