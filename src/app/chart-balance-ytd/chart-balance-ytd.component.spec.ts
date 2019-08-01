import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBalanceYtdComponent } from './chart-balance-ytd.component';

describe('ChartBalanceYtdComponent', () => {
  let component: ChartBalanceYtdComponent;
  let fixture: ComponentFixture<ChartBalanceYtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBalanceYtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBalanceYtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
