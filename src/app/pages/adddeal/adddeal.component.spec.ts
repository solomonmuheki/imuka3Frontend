import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddealComponent } from './adddeal.component';

describe('AdddealComponent', () => {
  let component: AdddealComponent;
  let fixture: ComponentFixture<AdddealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
