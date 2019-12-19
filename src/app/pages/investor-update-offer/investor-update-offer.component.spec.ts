import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorUpdateOfferComponent } from './investor-update-offer.component';

describe('InvestorUpdateOfferComponent', () => {
  let component: InvestorUpdateOfferComponent;
  let fixture: ComponentFixture<InvestorUpdateOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorUpdateOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorUpdateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
