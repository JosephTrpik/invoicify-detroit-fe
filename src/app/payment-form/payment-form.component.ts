import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
  animations: [fadeInAnimation]
})
export class PaymentFormComponent implements OnInit {

  paymentForm: NgForm;
  @ViewChild('paymentForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;
  billingRecords: any[];
  companies: any[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() { 
    this.getBillingRecords(); 
    this.getCompanies();
  }

  getBillingRecords() {
    this.dataService.getRecords("billing-record")
      .subscribe(
        results => this.billingRecords = results,
        error => this.errorMessage = <any>error);
  }

  getCompanies() {
    this.dataService.getRecords("company")
      .subscribe(
        companies => this.companies = companies,
        error =>  this.errorMessage = <any>error);
  }

  savePayment(paymentForm: NgForm) {
    let endpoint = "payment/" + paymentForm.value.client;
    delete(paymentForm.value.client)
    this.dataService.addRecord(endpoint, paymentForm.value)
      .subscribe(
        company => this.successMessage = "Record added successfully",
        error => this.errorMessage = <any>error);
    this.paymentForm.reset()

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.paymentForm = this.currentForm;
    this.paymentForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.paymentForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'paymentDescription': ''
  };

  validationMessages = {
    'paymentDescription': {
      'required': 'Description name is required.',
      'minlength': 'Description name must be at least 5 characters long.',
      'maxlength': 'Description name cannot be more than 30 characters long.'
    }
  };
}