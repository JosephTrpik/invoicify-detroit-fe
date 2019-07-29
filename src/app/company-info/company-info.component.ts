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
		// find first created invoice date
		// for each date from the first created invoice date:
			// get invoice total balance on this date
			
		// let dataPoints = this.invoices.map(invoice => invoice.)
		

	}

	private createGraph(dataPoints: any[]) {
		dataPoints.sort((a, b) => {
			return a.x.getTime() - b.x.getTime();
		});
		console.log("datapoints ", dataPoints);
		// let dataPoints = this.invoices.map((invoice) => {
		// 	console.log(invoice.balance);
		// 	let item = { x: new Date(invoice.createdOn), y: 300 }
		// 	// let item = { x: new Date("2018-03-01"), y: 85.3 }
		// 	// { x: invoice.createdOn, y: 100 }
		// 	return item;
		// })
		// let dataPoints = [
			// { x: new Date("2018-03-01"), y: 85.3 },
		// 	{ x: new Date("2018-03-02"), y: 83.97 },
		// 	{ x: new Date("2018-03-05"), y: 83.49 },
		// 	{ x: new Date("2018-03-06"), y: 84.16 },
		// 	{ x: new Date("2018-03-07"), y: 84.86 },
		// 	{ x: new Date("2018-03-08"), y: 84.97 },
		// 	{ x: new Date("2018-03-09"), y: 85.13 },
		// 	{ x: new Date("2018-03-12"), y: 85.71 },
		// 	{ x: new Date("2018-03-13"), y: 84.63 },
		// 	{ x: new Date("2018-03-14"), y: 84.17 },
		// 	{ x: new Date("2018-03-15"), y: 85.12 },
		// 	{ x: new Date("2018-03-16"), y: 85.86 },
		// 	{ x: new Date("2018-03-19"), y: 85.17 },
		// 	{ x: new Date("2018-03-20"), y: 85.99 },
		// 	{ x: new Date("2018-03-21"), y: 86.1 },
		// 	{ x: new Date("2018-03-22"), y: 85.33 },
		// 	{ x: new Date("2018-03-23"), y: 84.18 },
		// 	{ x: new Date("2018-03-26"), y: 85.21 },
		// 	{ x: new Date("2018-03-27"), y: 85.81 },
		// 	{ x: new Date("2018-03-28"), y: 85.56 },
		// 	{ x: new Date("2018-03-29"), y: 88.15 }
		// ];
		let chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Balance History"
			},
			axisX: {
				valueFormatString: "DD MMM",
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
				xValueFormatString: "DD MMM",
				yValueFormatString: "$##0.00",
				dataPoints: dataPoints
			}]
		});
		chart.render();
	}

	getBalanceOnDate(balance_date: Date) : number {
		// console.log("invoices in func: ",this.invoices);
		let curBal = 0.0;
		this.invoices.forEach(invoice => {
			console.log("paid on ",invoice.paidOn);
			if (!invoice.paidOn) {
				// console.log(invoice.initialBalance);
				curBal += invoice.initialBalance;
				// return;
			}
			else if (new Date(invoice.paidOn) > balance_date) {
				console.log("initial balance",invoice.initialBalance);
				curBal += invoice.initialBalance;
			}
			
		});
		console.log(curBal);
		return curBal;
	}

	// getInvoices(id: number) {
	// 	this.dataService.getRecords("invoice/company/" + id)
	// 		.subscribe(
	// 			results => this.invoices = results,
	// 			error => this.errorMessage = <any>error);
	// }
  // getInvoices(id: number) {
  //   this.dataService.getRecords("invoice/company/"+id)
  //     .subscribe(
  //       results => this.invoices = results,
  //       error =>  this.errorMessage = <any>error);
  // }
  
  getInvoices(id: number) {
    this.dataService.getRecords("invoice/company/"+id)
      .subscribe((results)=>{
		this.invoices = results; 
		// let dates_to_check/: Date[];
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
		// let minDate/ = this.getMinDate();
		// let dataPoints: any[];
		let dataPoints = new Array();
		// let maxDate = this.getMaxDate();
		dates_to_check.forEach(date => {
			// this.getBalanceOnDate(date);
			dataPoints.push({x:date, y:this.getBalanceOnDate(date)});
		});
		// this.getBalanceOnDate(new Date());
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
