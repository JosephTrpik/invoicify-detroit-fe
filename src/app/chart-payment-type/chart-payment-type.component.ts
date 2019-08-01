import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service'
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-chart-payment-type',
  templateUrl: './chart-payment-type.component.html',
  styleUrls: ['./chart-payment-type.component.css']
})
export class ChartPaymentTypeComponent implements OnInit {

  
  errorMessage: string;
  successMessage: string;
  invoices: any[];
  dataCards: any;
  title = 'canvasjs-angular';

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getDataCards();
  }
  private createDonutGraph(dataPoints: any[], chartName: String, color: String, textVal: String) {

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
      title:{
        text: textVal,
        horizontalAlign: "center",
				fontFamily: "Helvetica",
				fontWeight: "bold"
      },
      data: [{
        type: "doughnut",
        startAngle: 60,
        innerRadius: 60,
        radius: "80%",
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

  getDataCards() {
    this.dataService.getRecords("data/")
      .subscribe((results) => {
        this.dataCards = results;

        this.setDataCards();
        return this.dataCards = results;
      }, error => { this.errorMessage = <any>error });

  }
  setDataCards() {
    let dataPoints = new Array();
    let colorTYPE = new Array();
    colorTYPE = ["#371447","#CB3974","#8A3575"];
    let i = 0;
    this.dataCards.findByRecordType.forEach(paymentMeth => {
      if (paymentMeth[1] === "FlatFeeBillingRecord")
        paymentMeth[1] = "Flat Fee"
      else
        paymentMeth[1] = "Rate Based"
      dataPoints.push({ y: paymentMeth[0], label:paymentMeth[1], color: colorTYPE[i]});
      i = i+1;
    });
    console.log("dataPoints----",dataPoints);
    this.createDonutGraph(dataPoints, "paymentMethChart","blue", "Payment Type");

  }



}
