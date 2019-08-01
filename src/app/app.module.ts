import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './routing/routing.module';
import { CompanyComponent } from './company/company.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { StatusMessageComponent } from './status-message/status-message.component';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { BillingRecordComponent } from './billing-record/billing-record.component';
import { BillingRecordFormComponent } from './billing-record-form/billing-record-form.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceComponent } from './invoice/invoice.component';

import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentComponent } from './payment/payment.component';
import { LandingPage1Component } from './landing-page1/landing-page1.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChartBalanceYtdComponent } from './chart-balance-ytd/chart-balance-ytd.component';
import { Chart30dayBalanceComponent } from './chart-30day-balance/chart-30day-balance.component';
import { ChartIncomeYtdComponent } from './chart-income-ytd/chart-income-ytd.component';
import { ChartPaymentMethodComponent } from './chart-payment-method/chart-payment-method.component';
import { ChartPaymentTypeComponent } from './chart-payment-type/chart-payment-type.component';


@NgModule({
  declarations: [
    CompanyInfoComponent,
    AppComponent,
    NavigationComponent,
    CompanyComponent,
    HomeComponent,
    DeleteConfirmComponent,
    CompanyFormComponent,
    StatusMessageComponent,
    UserComponent,
    UserFormComponent,
    BillingRecordComponent,
    BillingRecordFormComponent,
    InvoiceFormComponent,
    InvoiceComponent,

    PaymentFormComponent,
    PaymentComponent,

    LandingPage1Component,

    AnalyticsComponent,

    ChartBalanceYtdComponent,

    Chart30dayBalanceComponent,

    ChartIncomeYtdComponent,

    ChartPaymentMethodComponent,

    ChartPaymentTypeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [DeleteConfirmComponent],
  providers: [DataService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
