import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { GetDataService } from 'src/app/get-data.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

 
  dateArrForCurrWeek;
  dateArrForPerMonth;
  dateArrForPerYears;
  label = 'Weekly data';

  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  graphViewNameButton = 'View graph by Line';
  constructor(
              private dataService: GetDataService
  ) { }

  ngOnInit() {
    this.getVisitsData();
  }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //   console.log(event, active);
    // }
  
    public randomize(): void {
      this.graphViewNameButton = this.barChartType === 'bar' ? 'View graph by Bar' : 'View graph by Line';
      this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    }

    getVisitsData(){
      this.dataService.GetFromDb('getIpVisits.php').subscribe(
        result => {
          this.dateArrForCurrWeek = JSON.parse(result)[0];
          this.dateArrForPerMonth = JSON.parse(result)[1];
          this.dateArrForPerYears = JSON.parse(result)[2];
          this.displayWeeklyData();
        }
      );
    }

    displayWeeklyData(){
      this.label = 'Weekly data';
      let dataLabels = [];
      let dataVisits = [];
      let dataMoves = [];
      this.dateArrForCurrWeek.forEach(element => {
        let date = new Date(element['date']);
        let day = date.getDate()< 10 ? '0' + date.getDate(): date.getDate();
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);

        dataLabels.push(day + "/" + month);
        dataVisits.push(+element['visits']);
        dataMoves.push(+element['moves']);
      });
      this.barChartLabels = dataLabels;
      this.barChartData = [
          { data: dataVisits, label: 'מספר גולשים' },
          { data: dataMoves, label: 'מספר תנועות' }
        ];
    }

    displayMonthlyData(){
      this.label = 'Monthly data';
      let dataLabels = [];
      let dataVisits = [];
      let dataMoves = [];
      this.dateArrForPerMonth.forEach(element => {
        dataLabels.push(element['date']);
        dataVisits.push(+element['visits']);
        dataMoves.push(+element['moves']);
      });
      this.barChartLabels = dataLabels;
      this.barChartData = [
          { data: dataVisits, label: 'מספר גולשים' },
          { data: dataMoves, label: 'מספר תנועות' }
        ];
    }
    displayDataByYear(){
      this.label = 'Data by year';
      let dataLabels = [];
      let dataVisits = [];
      let dataMoves = [];
      this.dateArrForPerYears.forEach(element => {
        dataLabels.push(element['date']);
        dataVisits.push(+element['visits']);
        dataMoves.push(+element['moves']);
      });
      this.barChartLabels = dataLabels;
      this.barChartData = [
          { data: dataVisits, label: 'מספר גולשים' },
          { data: dataMoves, label: 'מספר תנועות' }
        ];
    }
}
