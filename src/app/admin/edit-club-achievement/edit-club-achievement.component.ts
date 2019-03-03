import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from 'src/app/get-data.service';
import { ClubAchievement } from '../../classes/clubachievement';
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import {  CKEditorComponent }  from 'ng2-ckeditor';

@Component({
  selector: 'app-edit-club-achievement',
  templateUrl: './edit-club-achievement.component.html',
  styleUrls: ['./edit-club-achievement.component.css']
})
export class EditClubAchievementComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private dataService: GetDataService,
              private dialog: MatDialog) { }

  editClub = this.fb.group({
    id: [''],
    title: ['',Validators.required],
    content: ['', Validators.required]
  });

  @ViewChild(CKEditorComponent) ckeditor: CKEditorComponent;
  
  spinner: boolean = false;
  achivements:ClubAchievement[];
  formView:boolean = true;
  saveButton:boolean = true;


  ngOnInit() {
    this.getAllAchivemenets();
    

  }
  onSubmit(){
    if(this.editClub.valid){
      let title = this.editClub.get('title').value;
      let text = this.editClub.get('content').value;
      let achiv: ClubAchievement = {
        id: null,
        title: title,
        text: text
      }
      this.dataService.addAchiv(achiv).subscribe(result => {
        this.spinner = true;
        if(result == 'SUCCESS'){
          this.resetForm();
          this.openDialog('','new club achievement was added successfully');
        }
        else if(result == 'ERROR'){
          this.spinner = false;
          this.openDialog('Error','There was a problem, please try later');
        }
      });
    }
  }

  getAllAchivemenets(){
    this.dataService.getClubAchievement().subscribe(result => {
      //debugger
      this.achivements = result;
    });
  }

  deleteAchiv(id: string){
    this.openConfirmDialog('Are you sure?',id);
  }

  updateAchive(){
    if(this.editClub.valid){
      let id = this.editClub.get('id').value;
      let title = this.editClub.get('title').value;
      let text = this.editClub.get('content').value;
      let achiv: ClubAchievement = {
        id: id,
        title: title,
        text: text
      }
      this.dataService.updateAchive(achiv).subscribe(result => {
        this.spinner = true;
        if(result == 'SUCCESS'){
          this.resetForm();
          this.saveButton = true;
          this.openDialog('','new club achievement was updated successfully');
        }
        else if(result == 'ERROR'){
          this.spinner = false;
          this.openDialog('Error','There was a problem, please try later');
        }
      });
    }
  }

  openDialog(title: string, message: string){
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: {title: title, message: message}
    });
  }

  editAchive(achive: ClubAchievement){
    this.saveButton = false;
    this.editClub.get('id').setValue(achive['id']);
    this.editClub.get('title').setValue(achive['title_hesegim']);
    this.editClub.get('content').setValue(achive['text_hesegim']);
    
  }

  resetForm(){
    this.formView = false;
    this.spinner = false;
    setTimeout(()=>{
      this.editClub.reset();
      this.formView = true;
    },1000);
  }
  openConfirmDialog(message: string,id: string){
    this.dialog.open(ConfirmComponent,{
      width:'350px',
      data:{message:message, id:id}
    });
  }

  ngAfterViewChecked(){
    let editor = this.ckeditor.instance;
    editor.config.height = '200';
    editor.config.toolbarGroups = [
      { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
      { name: 'links', groups: [ 'links' ] },
      { name: 'insert', groups: [ 'insert' ] },
      '/',
      { name: 'styles', groups: [ 'styles' ] },
      { name: 'colors', groups: [ 'colors' ] },
      { name: 'tools', groups: [ 'tools' ] },
      { name: 'others', groups: [ 'others' ] },
      { name: 'about', groups: [ 'about' ] }
    ];
    editor.config.removeButtons = 'NewPage,Preview,Save';
  }
}


export interface DialogData {
  message: string;
  id:string
}

@Component({
  selector: 'dialog-confirm',
  templateUrl: './confirmDialog.html',
  styleUrls: ['./edit-club-achievement.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
              private editClass: EditClubAchievementComponent,
              public dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              @Inject(DOCUMENT) private document: any,
              private dataService: GetDataService) {}
  ngOnInit() {
  }
  accept(){
    document.getElementById('achiveId'+this.data.id).style.display = 'none';
    this.dataService.deleteAchivemenet(this.data.id).subscribe(result => {
      if(result == "SUCCESS"){
        this.editClass.openDialog('','Deleted Successfully ');
      }
      else if(result == "ERROR"){
        this.editClass.openDialog('Error','There was a problem, please try later');
      }
    });
    this.dialogRef.close();
  }
}