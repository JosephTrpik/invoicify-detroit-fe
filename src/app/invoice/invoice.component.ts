import { Component, OnInit, Input } from '@angular/core';

import jspdf from 'jspdf';  
import 'jspdf-autotable';

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
  selectedInvoiceId = 0;
  selectedUnpaidInvoice: boolean = false;
  invoices: any[];
  unpaidInvoices: any[];
  paidInvoices: any[];
  duplicateResults: any[];

  constructor (private dataService: DataService) {}

  ngOnInit() { 
    this.getInvoices(); 
    this.getPaidInvoices(); 
    this.getUnpaidInvoices(); 
  }

  getInvoices() {
    this.dataService.getRecords("invoice")
      .subscribe(
        results => this.invoices = results,
        error =>  this.errorMessage = <any>error);
  }

  getPaidInvoices() {
    this.dataService.getRecords("invoice/paid")
      .subscribe(
        results => this.paidInvoices = results,
        error =>  this.errorMessage = <any>error);
  }

  getUnpaidInvoices() {
    this.dataService.getRecords("invoice/unpaid")
      .subscribe(
        results => this.unpaidInvoices = results,
        error =>  this.errorMessage = <any>error);
  }


  onSelectionChangeUnpaid(invoiceId) {
      this.selectedInvoiceId = invoiceId;
      this.selectedUnpaidInvoice = true;
  }

  onSelectionChangePaid(invoiceId) {
    this.selectedInvoiceId = invoiceId;
    this.selectedUnpaidInvoice = false;
}

  duplicateInvoice(selectedInvoiceId) {
    this.dataService.duplicateInvoice("invoice/duplicate", selectedInvoiceId).subscribe(
      results => this.duplicateResults = results,
      error => this.errorMessage = <any>error);  

      var i;
      for (i = 0; i < 25; i++) { 
        this.getUnpaidInvoices();
      }
  }

  trackByFn(index, item) {
    return index; 
  }

  public makePDF()  
  {  
    let pdf = new jspdf('p', 'pt', 'letter');
    pdf.text(60, 30, "Unpaid");
    pdf.autoTable({html: '#dataTable', theme: 'grid', minCellHeight: 1000});
    pdf.addPage();
    pdf.text(60, 30, "Paid");
    pdf.autoTable({html: '#dataTable1', theme: 'grid', minCellHeight: 1000});

    pdf.save('PDFify.pdf'); 
  }  

}
