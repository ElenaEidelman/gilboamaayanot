import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/get-data.service';
import { FormBuilder ,FormControl, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-edit-diary',
  templateUrl: './edit-diary.component.html',
  styleUrls: ['./edit-diary.component.css']
})
export class EditDiaryComponent implements OnInit, OnDestroy {

  constructor(
              private activeRoute: ActivatedRoute,
              private dataService: GetDataService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private router : Router
  ) { }

  unSubscribe;
  diaryId;
  diary;
  label = '';
  saveButton: boolean;
  diaryForm = this.fb.group({
    id: [''],
    diaryLink : ['',Validators.required],
    diaryTitle:['', Validators.required]
  });
  spinner: boolean = false;

  ngOnInit() {
    this.getDiary();
  }

  getDiary(){
    this.unSubscribe = this.activeRoute.params.subscribe(
      param => {
        this.diaryId = param['id'];
        this.dataService.getDiary(param['id']).subscribe(
          result => {
            if(result.id == null){
              this.saveButton = true;
              this.dataService.SendToDb('getDiaryHebName.php','diary/'+this.diaryId).subscribe(
                result => {
                  this.label = JSON.parse(result);
                  this.diaryForm.get('diaryTitle').setValue(JSON.parse(result));
                }
              );
            }
            else{
              this.saveButton = false;
              this.diary = result;
              this.diaryForm.get('diaryLink').setValue(result.src);
              this.diaryForm.get('id').setValue(result.id);
              this.diaryForm.get('diaryTitle').setValue(result.titleHeb);
              this.label = result.titleHeb;
              /**
               * 
               * id: "3"
                idName: "weeklydiary"
                src: "https://calendar.google.com/calendar/embed?src=mpkua0beq2409vncahis6t8tuo%40group.calendar.google.com&amp;ctz=Asia/Jerusalem"
                titleHeb: "יומן שבועי"
               */
            }
          }
        );
      }
    );
  }
  updateDiary(){
    this.spinner = true;
    if(this.diaryForm.valid){
      let dataToDb = {
        id: this.diaryForm.get('id').value,
        src: this.diaryForm.get('diaryLink').value,
        title: this.diaryForm.get('diaryTitle').value
      }
      this.dataService.SendToDb('updateDiary.php', dataToDb).subscribe(
        result =>{
          this.spinner = false;
          if(result == 'SUCCESS'){
            this.openDialog('Success', 'Diary was changed');
          }
          else{
            this.openDialog('Error', 'Something went wrong');
          }
        }
      );
    }
    else{
      this.openDialog('Error','Please fill all fields');
      this.spinner = false;
    }
  }
  saveDiary(){
    this.spinner = true;
    if(this.diaryForm.valid){
      let dataToDb = {
        engTitle: this.diaryId,
        src: this.diaryForm.get('diaryLink').value,
        title: this.diaryForm.get('diaryTitle').value
      }
      this.dataService.SendToDb('saveDiary.php', dataToDb).subscribe(
        result =>{
          this.spinner = false;
          if(result == 'SUCCESS'){
            this.openDialog('Success', 'Diary was added');
            this.router.navigate(['admin']);
          }
          else{
            this.openDialog('Error', 'Something went wrong');
          }
        }
      );
    }
    else{
      this.openDialog('Error','Please fill all fields');
    }
  }
  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      width: "350px",
      data: { title: title, message: message }
    });
  }

  ngOnDestroy(){
    this.unSubscribe.unsubscribe();
  }
  deleteDiary(){
    this.openConfirmDelete('Are you sure you want to delete this diary?','diary','idName',this.diaryId,'',false,'');
    this.router.navigate(['admin']);
  }

  openConfirmDelete(title, db,param,id,domId,element,dataFile){
    this.dialog.open(DialogConfirmComponent,{
      width:"350px",
      data:{message:title,db:db,param:param, id:id, domId:domId,element:element, fileName:dataFile}
    })
  }
}
