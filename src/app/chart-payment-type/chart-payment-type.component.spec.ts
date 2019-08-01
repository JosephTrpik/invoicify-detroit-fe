import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPaymentTypeComponent } from './chart-payment-type.component';

describe('ChartPaymentTypeComponent', () => {
  let component: ChartPaymentTypeComponent;
  let fixture: ComponentFixture<ChartPaymentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPaymentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
