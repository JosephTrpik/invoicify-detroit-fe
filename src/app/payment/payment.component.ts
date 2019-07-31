import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  animations: [fadeInAnimation]
})
export class PaymentComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  payments: any[];

  constructor (private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() { this.getPayments(); }

  getPayments() {
    this.dataService.getRecords("new-payment")
      .subscribe(
        payments => this.payments = payments,
        error =>  this.errorMessage = <any>error);
  }

  deletePayment(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("new-payment", id)
          .subscribe(
            payment => {this.successMessage = "Record(s) deleted succesfully"; this.getPayments(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
