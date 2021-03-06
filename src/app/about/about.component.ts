import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetDataService } from '../get-data.service';
import { ExcelService } from '../excel.service';


// import { Calendar } from '@fullcalendar/core';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';


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
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private http: HttpClient, private dataService: GetDataService, private excelService: ExcelService) {
  }
  data: ForExcel[] = [];
  @Input() publicKey = 'AIzaSyDLpHYiJK9peGq6nMk-5_NIhNU9L_dyuhw';
  @Input() calendarId = 'mpkua0beq2409vncahis6t8tuo@group.calendar.google.com';
  ngOnInit() {
    this.getData();
  }

  getData() {
    let PUBLIC_KEY = this.publicKey,
      CALENDAR_ID = this.calendarId;
    // let PUBLIC_KEY = 'AIzaSyCrKs5MXvM9mOUtQVYUf1FKfEQGlNXxnSo',
    // CALENDAR_ID = 'unb5curmgfbo4d7dpbcqgldapk@group.calendar.google.com';
    // let dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
    //   CALENDAR_ID, '/events?key=', PUBLIC_KEY,'&orderBy:hjhjhj'].join('');


    let dataUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${PUBLIC_KEY}&maxResults=2500`;
    //debugger
    //&pageToken=CigKGnBtY3VpMW9vMnU1dW9kb285bjRycWRiNm9jGAEggICA4MfGiL8TGg0IABIAGOCUws2aieUC
    //current date
    let curDate = new Date();
    let tempCurDate = new Date();
    let curDayOfWeek = curDate.getDay();
    let curStartWeek = new Date(curDate.setDate(curDate.getDate()-curDayOfWeek));
    let curEndWeek = new Date(curDate.setDate(curDate.getDate() + 6));

    return this.http.get(dataUrl).toPromise().then(async (data: any) => {
         let correctData;
         if(!data['nextPageToken']){
           correctData = data;
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
                nextPageTokenExist = false;
                
              }
            }
            while(nextPageTokenExist);
         }
      correctData.items.forEach(element => {
      
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


        let start,end;
        try {
           start = element['start'].dateTime != undefined ? element['start'].dateTime : element['start'].date;
           end = element['end'].dateTime != undefined ? element['end'].dateTime : element['end'].date;

           
           let date = new Date(start);
           let tempDate = new Date(start);
           let dayOfWeek = date.getDay();
           let startWeek = new Date(date.setDate(date.getDate()-dayOfWeek));
           let endWeek = new Date(date.setDate(date.getDate() + 6));
   
           if((startWeek <= tempDate && endWeek >= tempDate) && (this.convertToReadableDate(startWeek) == this.convertToReadableDate(curStartWeek) && this.convertToReadableDate(endWeek) == this.convertToReadableDate(curEndWeek))){
            //debugger
             this.data.push({
               title: element['summary'],
               description: element['description'],
               startDate: this.convertToReadableDate(start),
               startTime: this.convertToReadableTime(start),
               endDate: this.convertToReadableDate(end),
               endTime: this.convertToReadableTime(end),
               location: element['location'],               
               dateString: start
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

  exportToExcel() {
    //console.log(this.data);
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

