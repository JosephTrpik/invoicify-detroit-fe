import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartIncomeYtdComponent } from './chart-income-ytd.component';

describe('ChartIncomeYtdComponent', () => {
  let component: ChartIncomeYtdComponent;
  let fixture: ComponentFixture<ChartIncomeYtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartIncomeYtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartIncomeYtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
