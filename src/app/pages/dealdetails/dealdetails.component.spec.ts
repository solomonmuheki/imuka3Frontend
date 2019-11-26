import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealdetailsComponent } from './dealdetails.component';

describe('DealdetailsComponent', () => {
  let component: DealdetailsComponent;
  let fixture: ComponentFixture<DealdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
