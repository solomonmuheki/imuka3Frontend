import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllAgentsComponent } from './admin-all-agents.component';

describe('AdminAllAgentsComponent', () => {
  let component: AdminAllAgentsComponent;
  let fixture: ComponentFixture<AdminAllAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
