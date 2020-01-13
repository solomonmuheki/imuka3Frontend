import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlldealsComponent } from './admin-alldeals.component';

describe('AdminAlldealsComponent', () => {
  let component: AdminAlldealsComponent;
  let fixture: ComponentFixture<AdminAlldealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlldealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlldealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
