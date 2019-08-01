import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { ActivatedRoute } from '@angular/router';

import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
	selector: 'app-invoice',
	templateUrl: './company-info.component.html',
	styleUrls: ['./company-info.component.css'],
	animations: [fadeInAnimation]
})
export class CompanyInfoComponent implements OnInit {

	errorMessage: string;
	successMessage: string;
	invoices: any[];
	title = 'canvasjs-angular';

	constructor(
		private dataService: DataService,
		private route: ActivatedRoute
	) { }
	
	ngOnInit() {
		this.getInvoices(this.route.params['value']['id']);
	}

	private createGraph(dataPoints: any[]) {
		dataPoints.sort((a, b) => {
			return a.x.getTime() - b.x.getTime();
		});
		console.log("datapoints ", dataPoints);

		let chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Balance History",
				fontFamily: "Helvetica",
				fontWeight: "bold"
			},
			axisX: {
				valueFormatString: "DD MMM YYYY",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "Balance (in USD)",
				includeZero: false,
				valueFormatString: "$##0.00",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function (e) {
						return "$" + CanvasJS.formatNumber(e.value, "##0.00");
					}
				}
			},
			data: [{
				type: "area",
				color: "#371447",
				xValueFormatString: "DD MMM YYYY",
				yValueFormatString: "$##0.00",
				dataPoints: dataPoints
			}]
		});
		chart.render();
	}

	getBalanceOnDate(balance_date: Date) : number {

		let curBal = 0.0;
		this.invoices.forEach(invoice => {
			console.log("paid on ",invoice.paidOn);
			if (!invoice.paidOn && new Date(invoice.createdOn) <= balance_date) {
				curBal += invoice.initialBalance;
			}
			else if (new Date(invoice.paidOn) > balance_date && new Date(invoice.createdOn) <= balance_date) {
				console.log("initial balance",invoice.initialBalance);
				curBal += invoice.initialBalance;
			}
			
		});
		console.log(curBal);
		return curBal;
	}


  getInvoices(id: number) {
    this.dataService.getRecords("invoice/company/"+id)
      .subscribe((results)=>{
		this.invoices = results; 

		let dates_to_check = new Array();
		console.log(this.invoices);
		this.invoices.forEach(invoice => {
			console.log(new Date(invoice.createdOn));
			dates_to_check.push(new Date(invoice.createdOn));
			if (invoice.paidOn) {
				dates_to_check.push(new Date(invoice.paidOn));

			}
		});
		dates_to_check.sort((a, b) => {
			return a.getTime() - b.getTime();
		});
		console.log("sorted dates --> ",dates_to_check);
		console.log("RESULTS---->",results);

		let dataPoints = new Array();

		dates_to_check.forEach(date => {
			dataPoints.push({x:date, y:this.getBalanceOnDate(date)});
		});

		this.createGraph(dataPoints);
        return this.invoices = results;
        }, error => { this.errorMessage = <any>error});
        
  }




	private getMinDate() {
		let minDate = new Date(this.invoices[0].createdOn);
		this.invoices.forEach(invoice => {
			let createdDate = new Date(invoice.createdOn);
			if (createdDate < minDate) {
				console.log(createdDate, " is less than ", minDate);
				minDate = createdDate;
			}
		});
		return minDate;
	}
	private getMaxDate() {
		let maxDate = new Date(this.invoices[0].paidOn);
		this.invoices.forEach(invoice => {
			let paidDate = new Date(invoice.paidOn)
			if (paidDate > maxDate) {
				console.log(paidDate, " is less than ", maxDate);
				maxDate = paidDate;
			}
		});
		return maxDate;
	}
}
