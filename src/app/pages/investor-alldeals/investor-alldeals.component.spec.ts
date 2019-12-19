import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorAlldealsComponent } from './investor-alldeals.component';

describe('InvestorAlldealsComponent', () => {
  let component: InvestorAlldealsComponent;
  let fixture: ComponentFixture<InvestorAlldealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorAlldealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorAlldealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
