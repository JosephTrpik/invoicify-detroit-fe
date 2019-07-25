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

  invoice: object;

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

      });
  }

  getInvoices() {
    this.dataService.getRecords("invoice")
      .subscribe(
        results => this.invoices = results,
        error =>  this.errorMessage = <any>error);
  }

  savePayment(paymentForm : NgForm){
     console.log(paymentForm);
    let endpoint = "invoice/payment/" + paymentForm.value.id
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
      // clear previous eIrror message (if any)
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
    'name': ''
  };

  validationMessages = {
    'name': {
      'required': 'Payment name is required.',
      'minlength': 'Payment name must be at least 2 characters long.',
      'maxlength': 'Payment name cannot be more than 30 characters long.'
    }
  };

}