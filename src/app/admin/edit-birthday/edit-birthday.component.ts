import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetDataService } from 'src/app/get-data.service';
import { Birthday} from '../../classes/birthday';

@Component({
  selector: 'app-edit-birthday',
  templateUrl: './edit-birthday.component.html',
  styleUrls: ['./edit-birthday.component.css']
})
export class EditBirthdayComponent implements OnInit {

  constructor(
              private dataService: GetDataService,
              private dialog: MatDialog,
              private fb: FormBuilder
  ) { }

  birthdays:Birthday[];
  saveButton:boolean = true;
  viewForm: boolean = true;
  spinner:boolean = false;
  editBirthdaysForm = this.fb.group({
    id:[''],
    date:['', Validators.required],
    birthdayList:['', Validators.required]
  });
  ngOnInit() {
    this.getBirthdays();
  }
  updateNews(){
    if(this.editBirthdaysForm.valid){
      this.spinner = true;
      let dataToDb = {
        id: this.editBirthdaysForm.value.id,
        birthdayList: this.editBirthdaysForm.value.birthdayList,
        date:new Date(this.editBirthdaysForm.value.date),
      }
      this.dataService.SendToDb('updateBirthday.php',dataToDb).subscribe(result => {
        this.spinner = false;
        if(result.includes('SUCCESS')){
          this.openDialog('','עודכן בהצלחה');
          this.resetForm();
        }
        else{
          this.openDialog('שגיאה','קרתה שגיאה, נא לנסות שוב פעם מאוחר יותר');
        }
      });
    }
    else{
      this.openDialog('שגיאה','נא למלא את כל השדות');
    }
  }
  onSubmit(){
    if(this.editBirthdaysForm.valid){
      this.spinner = true;
      let dataToDb = {
        id: this.editBirthdaysForm.value.id,
        birthdayList: this.editBirthdaysForm.value.birthdayList,
        date:new Date(this.editBirthdaysForm.value.date),
      }
      this.dataService.SendToDb('addBirthday.php',dataToDb).subscribe(result => {
        this.spinner = false;
        if(result.includes('SUCCESS')){
          this.openDialog('','התווסף בהצלחה');
          this.resetForm();
        }
        else{
          this.openDialog('שגיאה','קרתה שגיאה, נא לנסות שוב פעם מאוחר יותר');
        }
      });
    }
    else{
      this.openDialog('שגיאה','נא למלא את כל השדות');
    }
  }
  editBirthday(birthday: Birthday){
    window.scroll(0,0);
    this.saveButton = false;
    this.editBirthdaysForm.get('id').setValue(birthday['id']);
    this.editBirthdaysForm.get('date').setValue(birthday['date_birthday']);
    this.editBirthdaysForm.get('birthdayList').setValue(birthday['name_birthday']);
  }
  deleteBirthday(id:number){
    this.openConfirmDelete('האם למחוק?','birthdays','id',id,'birthday'+id,true,'');
  }
  getBirthdays(){
    this.dataService.getBirthday().subscribe(result => {
      this.birthdays = result;
    });
  }

  resetForm(){
    this.viewForm = false;
    setTimeout(()=>{
      this.editBirthdaysForm.reset();
      this.viewForm = true;
    },0);
  }
  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      width: "350px",
      data: { title: title, message: message }
    });
  }
  openConfirmDelete(title, db,param,id,domId,element,dataFile){
    this.dialog.open(DialogConfirmComponent,{
      width:"350px",
      data:{message:title,db:db,param:param, id:id, domId:domId,element:element, fileName:dataFile}
    })
  }
}
