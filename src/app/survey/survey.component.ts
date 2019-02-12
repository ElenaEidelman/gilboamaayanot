import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Survey } from '../classes/survey';
import { GetDataService } from '../get-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private dataService: GetDataService, private dialog: MatDialog) { }
  survey:Survey[];
  surveyData:Survey;
  surveySelected:Survey;
  votesSum: number;

  color = 'warn';
  mode = 'determinate';
  value :any = {};
  bufferValue = 75;
 
  ngOnInit() {
    this.getSurvey();
  }


  getSurvey(){
     this.dataService.getSurvey().subscribe(result => {
      //debugger
      this.surveyData = result.slice(0,1)[0];
      this.survey = result.slice(1);
    });
  }

  openDialogSurvey(data:any, dataForTitle:any): void {
    this.dialog.open(DialogSurvey, {
      width: '450px',
      data: {data,dataForTitle}
    });
  }
}

@Component({
  selector: 'dialog-survey',
  templateUrl: './dialogSurvey.html',
  styleUrls: ['./survey.component.css']
})
export class DialogSurvey{
  surveySelected:Survey;
  constructor(
    public dialogRef: MatDialogRef<DialogSurvey>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dataService: GetDataService) {}

    openDialog(title:string, message:string): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '450px',
        data: {title,message}
      });
    }

    point(data:any){
      if(data == undefined){
        this.openDialog('שגיאה','נא לבחור אחת מהתוצאות');
      }
      else{
        this.dataService.setSurvey(data).subscribe(result => {
          //debugger
          if(result == 'SUCCESS'){
            this.dialogRef.close();
            this.openDialog('תודה',' תשובתך נקלטה בהצלחה');
          }
          else if(result == 'IP_EXIST'){
            this.openDialog('','לא ניתן להצביע פעמיים');
          }
          else{
            this.openDialog('קרתה תקלה','נא לנסות עוד פעם')
          }
        });

      }
    }

}
