import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GetDataService } from 'src/app/get-data.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {

  constructor(
              private fb: FormBuilder,
              private dialog: MatDialog,
              private dataService: GetDataService) { }

  ngOnInit() {
  }
  viewForm = true;
  surveyForm = this.fb.group({
    title:['',Validators.required],
    options:this.fb.array([this.fb.group({option:''}, Validators.required)])
  });

  openDialog(title: string, message: string){
    this.dialog.open(DialogComponent,{
      width: "350px",
      data:{title:title,message:message}
    });
  }
  get surveyOptions(){
    return this.surveyForm.get('options') as FormArray;
  }
  addOption(){
    this.surveyOptions.push(this.fb.group({option:''}));
  }
  deleteOption(index){
    this.surveyOptions.removeAt(index);
  }

  saveSurvey(){
    if(this.surveyForm.valid && this.surveyOptions.length > 0){
      let dataToDb = {
        title: this.surveyForm.get('title').value,
        options: this.surveyForm.get('options').value
      }
      this.dataService.saveSurvey(dataToDb).subscribe(
        result => {
          if(result == 'SUCCESS'){
            this.openDialog('Success','Survey changed');
            this.surveyOptions.reset();
            for(let i = this.surveyOptions.length-1; i >= 0; i--) {
              this.surveyOptions.removeAt(i)
            }
            this.viewForm = false;
            setTimeout(()=>{
              this.viewForm = true;
              this.surveyForm.reset();
            });
          }
          else{
            this.openDialog('Error','Something went wrong');
          }
        }
      );
    }
    else{
      this.openDialog('Error','Please fill all field');
    }
  }
}
