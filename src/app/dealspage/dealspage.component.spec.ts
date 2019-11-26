import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealspageComponent } from './dealspage.component';

describe('DealspageComponent', () => {
  let component: DealspageComponent;
  let fixture: ComponentFixture<DealspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
