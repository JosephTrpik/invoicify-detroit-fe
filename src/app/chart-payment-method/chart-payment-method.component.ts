import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { ActivatedRoute } from '@angular/router';

import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-chart-payment-method',
  templateUrl: './chart-payment-method.component.html',
  styleUrls: ['./chart-payment-method.component.css']
})
export class ChartPaymentMethodComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  invoices: any[];
  dataCards: any;
  title = 'canvasjs-angular';
  paymentMethod: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getDataCards();
  }

  private createDonutGraph(dataPoints: any[], chartName: String, color: String, textVal: String) {
    // dataPoints.sort((a, b) => {
    //   return a.x.getTime() - b.x.getTime();
    // });
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
        innerRadius: 70,
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

  private setDataCards() {
    //function to set the datacards we just grabbed
    let dataPoints = new Array();
    this.paymentMethod = this.dataCards.findByMethodType;
    console.log("payment method =======>",this.paymentMethod);
    let colorTYPE = new Array();
    // colorTYPE = ["#FF5733","#33FF5F","#33C5FF"];
    colorTYPE = ["#371447","#CB3974","#8A3575"];
    let i = 0;
    for (let entry of this.paymentMethod){
      dataPoints.push({ y: entry[0], label: entry[1] , color: colorTYPE[i]});
      // console.log("entry of paymentmethod ---->",entry);
      i = i+1;
    }
    console.log("data points------>",dataPoints);
    this.createDonutGraph(dataPoints, "paymentMethodChart","blue", "Payment Method");
    
  }
}
