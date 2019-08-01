import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart30dayBalanceComponent } from './chart-30day-balance.component';

describe('Chart30dayBalanceComponent', () => {
  let component: Chart30dayBalanceComponent;
  let fixture: ComponentFixture<Chart30dayBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chart30dayBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chart30dayBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
