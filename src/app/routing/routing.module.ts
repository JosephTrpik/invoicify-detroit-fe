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
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { LandingPage1Component } from 'app/landing-page1/landing-page1.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: LandingPage1Component },
  { path: 'company',  component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'company/id', component: CompanyInfoComponent, canActivate: [AuthGuard]},
  // adding company-info path 
  { path: 'company-info/:id', component: CompanyInfoComponent, canActivate: [AuthGuard] },
  { path: 'company/edit/:id', component: CompanyFormComponent, canActivate: [AuthGuard] },
  { path: 'company/add', component: CompanyFormComponent, canActivate: [AuthGuard] },
  { path: 'user',  component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'user/add', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'billing-record',  component: BillingRecordComponent, canActivate: [AuthGuard] },
  { path: 'billing-record/add', component: BillingRecordFormComponent, canActivate: [AuthGuard] },
  {path: 'billing-record/edit/:id', component: BillingRecordFormComponent, canActivate: [AuthGuard]},
  { path: 'invoice/add', component: InvoiceFormComponent, canActivate: [AuthGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
