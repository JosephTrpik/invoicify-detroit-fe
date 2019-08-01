import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { ActivatedRoute } from '@angular/router';

import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  invoices: any[];
  dataCards: any;
  title = 'canvasjs-angular';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getInvoices();
    this.getDataCards();
  }

  private createLineGraph(dataPoints: any[], chartName: String, color: String, textVal: String) {
    dataPoints.sort((a, b) => {
      return a.x.getTime() - b.x.getTime();
    });
    console.log("datapoints ", dataPoints);
    let defColor : String;
    if (color === "red"){
        defColor = "#FF5733";
    }
    else if (color === "green"){
      defColor = "#33FF5F";
    }
    else if (color === "blue"){
      defColor = "#33C5FF";
    }
    let chart = new CanvasJS.Chart(chartName, {
      animationEnabled: true,
      theme: "light",
      title: {
        text: textVal
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
        color: defColor,
        xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "$##0.00",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }


  private createDonutGraph(dataPoints: any[], chartName: String, color: String, textVal: String) {
    dataPoints.sort((a, b) => {
      return a.x.getTime() - b.x.getTime();
    });
    console.log("datapoints ", dataPoints);
    let defColor : String;
    if (color === "red"){
        defColor = "#FF5733";
    }
    else if (color === "green"){
      defColor = "#33FF5F";
    }
    else if (color === "blue"){
      defColor = "#33C5FF";
    }
    let chart = new CanvasJS.Chart(chartName, {
      animationEnabled: true,
      theme: "light",
      title: {
        text: textVal
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
        type: "doughnut",
        color: defColor,
        xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "$##0.00",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

  getBalanceOnDate(balance_date: Date): number {

    let curBal = 0.0;
    this.invoices.forEach(invoice => {
      // console.log("paid on ", invoice.paidOn);
      if (!invoice.paidOn) {
        curBal += invoice.initialBalance;
      }
      else if (new Date(invoice.paidOn) > balance_date) {
        // console.log("initial balance", invoice.initialBalance);
        curBal += invoice.initialBalance;
      }

    });
    // console.log(curBal);
    return curBal;
  }
  getIncomeOnDate(balance_date: Date): number {

    let curBal = 0.0;
    this.invoices.forEach(invoice => {
      // console.log("paid on ", invoice.paidOn);
      if (invoice.paidOn && new Date(invoice.paidOn) <= balance_date) {
        // console.log("initial balance", invoice.initialBalance);
        curBal += invoice.initialBalance;
      }

    });
    // console.log(curBal);
    return curBal;
  }


  getInvoices() {
    this.dataService.getRecords("invoice/")
      .subscribe((results) => {
        this.invoices = results;

        this.getDataAndGraph();
        return this.invoices = results;
      }, error => { this.errorMessage = <any>error });

  }
  getDataCards() {
    this.dataService.getRecords("data/")
      .subscribe((results) => {
        this.dataCards = results;

        this.setDataCards();
        return this.dataCards = results;
      }, error => { this.errorMessage = <any>error });

  }
  
  private getDataAndGraph() {
    console.log("get data cards ==>",this.dataCards);
    let dates_to_check = new Array();
    // console.log(this.invoices);
    this.invoices.forEach(invoice => {
      // console.log(new Date(invoice.createdOn));
      dates_to_check.push(new Date(invoice.createdOn));
      if (invoice.paidOn) {
        dates_to_check.push(new Date(invoice.paidOn));
      }
    });
    dates_to_check.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
    console.log("sorted dates --> ", dates_to_check);
    // console.log("RESULTS---->", results);
    let dataPoints = new Array();
    let dataPoints30day = new Array();
    let dataPointsIncome = new Array();
    dates_to_check.forEach(date => {
      let bal_on_date = this.getBalanceOnDate(date)
      if (date.getFullYear() === 2019)
        dataPoints.push({ x: date, y: bal_on_date });
      if (Date.now() - date.getTime() < 30 * 8.64e+7)
        dataPoints30day.push({ x: date, y: bal_on_date });
      if (date.getFullYear() === 2019) {
        let income_on_date = this.getIncomeOnDate(date);
        dataPointsIncome.push({x: date, y: income_on_date});
      } 
    
    });

    this.createLineGraph(dataPointsIncome, "incomeYTD", "blue", "Income YTD");
    this.createLineGraph(dataPoints, "chartContainer","red", "Balance History");
    this.createLineGraph(dataPoints30day, "30dayChart","green", "30 Days Balance History");
    this.createDonutGraph(dataPoints30day, "30dayChart","blue", "DONUT CHART");

  }

  private setDataCards() {
    //function to set the datacards we just grabbed
  }
}
