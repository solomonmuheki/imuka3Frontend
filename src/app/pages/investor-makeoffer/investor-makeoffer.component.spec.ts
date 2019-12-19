import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorMakeofferComponent } from './investor-makeoffer.component';

describe('InvestorMakeofferComponent', () => {
  let component: InvestorMakeofferComponent;
  let fixture: ComponentFixture<InvestorMakeofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorMakeofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorMakeofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
