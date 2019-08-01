import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from '../auth-guard.service';

import { CompanyComponent }   from '../company/company.component';
import { CompanyFormComponent }   from '../company-form/company-form.component';
import { HomeComponent }   from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { BillingRecordComponent } from '../billing-record/billing-record.component';
import { BillingRecordFormComponent } from '../billing-record-form/billing-record-form.component';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { PaymentComponent } from '../payment/payment.component';
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { LandingPage1Component } from 'app/landing-page1/landing-page1.component';
import { AnalyticsComponent } from 'app/analytics/analytics.component';
import { ChartBalanceYtdComponent } from 'app/chart-balance-ytd/chart-balance-ytd.component';
import { Chart30dayBalanceComponent } from 'app/chart-30day-balance/chart-30day-balance.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing',  component: LandingPage1Component },
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'company',  component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'company/id', component: CompanyInfoComponent, canActivate: [AuthGuard]},
  // chart 30 days balance
  { path: 'chart30daybalance', component: Chart30dayBalanceComponent},
  // chart balance ytd
  { path: 'chartbalanceytd', component: ChartBalanceYtdComponent},
  //
  // analytic path
  { path: 'analytics', component: AnalyticsComponent},
  // adding company-info path 
  { path: 'company-info/:id', component: CompanyInfoComponent, canActivate: [AuthGuard] },
  { path: 'company/edit/:id', component: CompanyFormComponent, canActivate: [AuthGuard] },
  { path: 'company/add', component: CompanyFormComponent, canActivate: [AuthGuard] },
  { path: 'user',  component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'user/add', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'billing-record',  component: BillingRecordComponent, canActivate: [AuthGuard] },
  { path: 'billing-record/add', component: BillingRecordFormComponent, canActivate: [AuthGuard] },
  { path: 'billing-record/edit/:id', component: BillingRecordFormComponent, canActivate: [AuthGuard]},
  { path: 'invoice/add', component: InvoiceFormComponent, canActivate: [AuthGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
  { path: 'invoice/payment/add/:id', component: PaymentFormComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
