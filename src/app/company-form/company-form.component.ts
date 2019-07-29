import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
  animations: [fadeInAnimation]
})
export class CompanyFormComponent implements OnInit {

  companyForm: NgForm;
  @ViewChild('companyForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  company: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("company", +params['id']))
      .subscribe(company => this.company = company);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveCompany(companyForm: NgForm){
    if(typeof companyForm.value.id === "number"){
      this.dataService.editRecord("company", companyForm.value, companyForm.value.id)
          .subscribe(
            company => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("company", companyForm.value)
          .subscribe(
            company => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.company = {};
            this.companyForm.reset()
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.companyForm = this.currentForm;
    this.companyForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.companyForm.form;

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
    'name': ''
  };

  validationMessages = {
    'name': {
      'required': 'Company name is required.',
      'minlength': 'Company name must be at least 2 characters long.',
      'maxlength': 'Company name cannot be more than 30 characters long.'
    }
  };

}
