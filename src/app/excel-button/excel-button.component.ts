import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../get-data.service';
import { ExcelService } from '../excel.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';


export class ForExcel {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  dateString?: string;
}

@Component({
  selector: 'app-excel-button',
  templateUrl: './excel-button.component.html',
  styleUrls: ['./excel-button.component.css'],
})
export class ExcelButtonComponent implements OnInit {

  constructor(
                private http: HttpClient, 
                private dataService: GetDataService, 
                private excelService: ExcelService,
                private fb: FormBuilder) { }

          //calendar date
        //servicecalendar@mishakeihashavua.iam.gserviceaccount.com
        //https://console.developers.google.com/apis/credentials?project=kfarhaoranim&supportedpurview=project


        // marlen8088@gmail.com
        //AIzaSyDcitC-EpuTSFObB0szM7spcSlMlDAGkR4

        //kfar haoranim
          //api key: AIzaSyCrKs5MXvM9mOUtQVYUf1FKfEQGlNXxnSo
          //id: unb5curmgfbo4d7dpbcqgldapk@group.calendar.google.com


        //imunei hashavua
          //api: AIzaSyDLpHYiJK9peGq6nMk-5_NIhNU9L_dyuhw
          //id: mpkua0beq2409vncahis6t8tuo@group.calendar.google.com

        //mishakei hashavua
          //api: AIzaSyBZQwJjYSlV1aiU-g1q98c_Dp_dYESbhnw
          //id: fg9v1616unvtkgjf8ghh6mec08@group.calendar.google.com

  data: ForExcel[] = [];
  @Input() publicKey: string;
  @Input() calendarId: string;
  disableButton: boolean = true;
  spinner: boolean = true;
  dateTo;
  dateFrom;
  yearFrom;
  monthFrom;
  dayFrom;
  excelTooltip:string = "exporting data to excel only for current week";
  dateChanged: boolean = false;
  dateFromTo =  this.fb.group({
    dateFrom: [],
    dateTo: []
  });

  ngOnInit() {
    this.getData();
  }

  ngOnChanges(){
    this.data = [];
    this.disableButton = true;
    this.spinner = true;
    this.getData();
  }

  getData() {
    let PUBLIC_KEY = this.publicKey,
      CALENDAR_ID = this.calendarId;
    // let PUBLIC_KEY = 'AIzaSyCrKs5MXvM9mOUtQVYUf1FKfEQGlNXxnSo',
    // CALENDAR_ID = 'unb5curmgfbo4d7dpbcqgldapk@group.calendar.google.com';
    // let dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
    //   CALENDAR_ID, '/events?key=', PUBLIC_KEY,'&orderBy:hjhjhj'].join('');


    let dataUrl = PUBLIC_KEY != '' && CALENDAR_ID != '' ? `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${PUBLIC_KEY}&maxResults=2500` : this.spinner = false;
    // let curDate = new Date();
    // let curDayOfWeek = curDate.getDay();
    // let curStartWeek = new Date(curDate.setDate(curDate.getDate()-curDayOfWeek));
    // let curEndWeek = new Date(curDate.setDate(curDate.getDate() + 6));
           //date from
           let CurrDate = new Date();
           let numOfWeek = CurrDate.getDay();
           if(!this.dateChanged){
              this.dayFrom = (CurrDate.getDate() - numOfWeek) < 10 ? "0" + (CurrDate.getDate() - numOfWeek) : CurrDate.getDate() - numOfWeek;
              this.monthFrom = (CurrDate.getMonth() + 1) < 10 ? "0" + (CurrDate.getMonth() + 1) : CurrDate.getMonth() + 1;
              this.yearFrom = CurrDate.getFullYear();
  
              this.dateFrom = new Date(this.monthFrom + "/" + this.dayFrom + "/" + this.yearFrom);
              //date to
              this.dateTo = new Date(this.dateFrom.getTime() + 6 * 24 * 60 * 60 * 1000);
              
              this.dateFromTo.get('dateFrom').setValue(this.dateFrom);
              this.dateFromTo.get('dateTo').setValue(this.dateTo);
           }

    return this.http.get(dataUrl.toString()).toPromise().then(async (data: any) => {
         let correctData;
         if(!data['nextPageToken']){
           correctData = data;
           this.disableButton = false;
           this.spinner = false;
         }
         else{
           let nextPageToken = data['nextPageToken'];
           let newDataUrl = dataUrl + '&pageToken=' + nextPageToken;
           let nextPageTokenExist: boolean = true;
           let returnedData: any;
            do{
              returnedData = await this.getCalendarData(newDataUrl);
              if(typeof returnedData == 'string'){
                let url = newDataUrl.split('').splice(0, newDataUrl.indexOf('pageToken')).join('');
                newDataUrl = url + 'pageToken=' + returnedData;
              }
              else{
                correctData = returnedData;
                this.disableButton = false;
                this.spinner = false;
                nextPageTokenExist = false;
                
              }
            }
            while(nextPageTokenExist);
         }
      correctData.items.forEach((element,index) => {
        if(index == 0){
          this.data = [];
        }
        let start,end;
        try {
           start = element['start'].dateTime != undefined ? element['start'].dateTime : element['start'].date;
           end = element['end'].dateTime != undefined ? element['end'].dateTime : element['end'].date;
           //check date
           let dateCheck = new Date(start);

          
           if(dateCheck >= this.dateFrom && dateCheck <= this.dateTo){
            this.data.push({
               dateString: start,
               location: element['location'],
               endTime: this.convertToReadableTime(end),
               endDate: this.convertToReadableDate(end),
               startTime: this.convertToReadableTime(start),
               startDate: this.convertToReadableDate(start),
               description: element['description'],
               title: element['summary'],
             })
           }
        } catch (error) {
          
        }
      });
      this.data.sort(function(a,b){
        return (+new Date(b.dateString)) - (+new Date(a.dateString));
     });
    });
  }
  dateHasChanged(type: string, event: MatDatepickerInputEvent<Date>){
   
    this.disableButton = true;
  }
  newExcelSearch(){
    this.disableButton = true;
    this.excelTooltip = "export to excel";
    this.spinner = true;
    this.dateChanged = true;
    let dFrom = this.convertToDateWithTime(this.dateFromTo.get('dateFrom').value,'from');
    let dTo = this.convertToDateWithTime(this.dateFromTo.get('dateTo').value,'to');
    this.dateFrom = this.convertToDateWithTime(dFrom,'from');
    this.dateTo = this.convertToDateWithTime(dTo,'to');
    this.getData();
  }
  convertToDateWithTime(date, timeFromTo){
    let day = new Date(date).getDate() < 10 ? '0' +  new Date(date).getDate() :  new Date(date).getDate();
    let month = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let timeFT = timeFromTo == 'from' ? '00:00:00' : '23:59:59';
    return new Date(month + '/' + day + '/' + year + ' ' + timeFT);
  }
  exportToExcel() {
    console.log(this.data);
    this.excelService.exportAsExcelFile(this.data, 'diary');
  }

  convertToReadableDate(date) {
    let newDate = new Date(date);
    let day = newDate.getDate() >= 10 ? newDate.getDate() : '0' + newDate.getDate();
    let month = (newDate.getMonth() + 1) >= 10 ? newDate.getMonth() + 1 : '0' + (newDate.getMonth() + 1);
    let year = newDate.getFullYear();

    return day + '/' + month + '/' + year;
  }
  convertToReadableTime(date) {
    let newDate = new Date(date);
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes() > 10 ? newDate.getMinutes() : '0' + newDate.getMinutes();

    return hours + ':' + minutes
  }

  getCalendarData(url: string){
    return this.http.get(url).toPromise().then((data: any)=>{
      if(data['nextPageToken'] == undefined){
        return data;
      }
      else{
       return data['nextPageToken'];
      }
    });
  }
}