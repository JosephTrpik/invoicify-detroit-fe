import { Component, OnInit, Input } from '@angular/core';

import * as jspdf from 'jspdf';  

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  animations: [fadeInAnimation]
})
export class InvoiceComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  invoices: any[];

  constructor (private dataService: DataService) {}

  ngOnInit() { this.getInvoices(); }

  getInvoices() {
    this.dataService.getRecords("invoice")
      .subscribe(
        results => this.invoices = results,
        error =>  this.errorMessage = <any>error);
  }

  public makePDF()  
  {  
    var data = document.getElementById('PDFify');  

  let margins = {
    top: 80, bottom: 60, left: 60, width: 522
    };
  
      let pdf = new jspdf('p', 'pt', 'letter');
      pdf.fromHTML(data,margins.left, margins.top);

      pdf.save('PDFify.pdf'); 
  }  
}
