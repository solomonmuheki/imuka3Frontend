import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorAlloffersComponent } from './investor-alloffers.component';

describe('InvestorAlloffersComponent', () => {
  let component: InvestorAlloffersComponent;
  let fixture: ComponentFixture<InvestorAlloffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorAlloffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorAlloffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
