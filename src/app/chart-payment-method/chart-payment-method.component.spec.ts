import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPaymentMethodComponent } from './chart-payment-method.component';

describe('ChartPaymentMethodComponent', () => {
  let component: ChartPaymentMethodComponent;
  let fixture: ComponentFixture<ChartPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
