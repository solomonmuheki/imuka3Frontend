import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorDealdetailComponent } from './investor-dealdetail.component';

describe('InvestorDealdetailComponent', () => {
  let component: InvestorDealdetailComponent;
  let fixture: ComponentFixture<InvestorDealdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorDealdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorDealdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
