import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
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
  invoices: any[];
  invoiceBalance: number = 0;
  invoiceId: number;
  invoice: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("invoice", +params['id']))
      .subscribe(invoice => this.invoice = invoice);
  }

  ngOnInit() {
    this.getInvoices();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
        this.invoiceId = params['id']; 
      });
  }

  getInvoices() {
    this.dataService.getRecords("invoice")
      .subscribe(
        results => this.invoices = results,
        error =>  this.errorMessage = <any>error);
  }

  savePayment(paymentForm : NgForm){
   
    this.errorMessage = "";

    if(this.invoice.currentBalance < this.paymentForm.value.amount)
    {
      this.errorMessage = "Please enter a value less than or equal to the current balance";
      return;
    }


    let endpoint = "new-payment/" + this.invoiceId;
    this.dataService.addRecord(endpoint, paymentForm.value)
      .subscribe(
        result => this.successMessage = "Record added successfully",
        error => this.errorMessage = <any>error
      );
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
    'amount': ''
  };

  validationMessages = {
    'amount': {
      'pattern': 'Must be a numeric value',
      'max': 'Payment amount must be less than or equal to the invoice balance.'
    }
  };

}
