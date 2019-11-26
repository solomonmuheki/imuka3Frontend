import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldealsComponent } from './alldeals.component';

describe('AlldealsComponent', () => {
  let component: AlldealsComponent;
  let fixture: ComponentFixture<AlldealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
