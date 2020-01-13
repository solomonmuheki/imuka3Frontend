import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlloffersComponent } from './admin-alloffers.component';

describe('AdminAlloffersComponent', () => {
  let component: AdminAlloffersComponent;
  let fixture: ComponentFixture<AdminAlloffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlloffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlloffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
