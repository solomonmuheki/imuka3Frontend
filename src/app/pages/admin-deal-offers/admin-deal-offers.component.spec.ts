import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDealOffersComponent } from './admin-deal-offers.component';

describe('AdminDealOffersComponent', () => {
  let component: AdminDealOffersComponent;
  let fixture: ComponentFixture<AdminDealOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDealOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDealOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
