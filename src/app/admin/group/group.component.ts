import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GetDataService } from 'src/app/get-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogConfirmComponent } from 'src/app/dialog-confirm/dialog-confirm.component';
import {SideMenuComponent} from '../side-menu/side-menu.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: GetDataService,
    private dialog: MatDialog) { }

  forUnsubscribe;
  idRoute;
  label;
  hugim;
  saveButton: boolean = true;
  viewForm: boolean = true;
  trainers;
  spinner = false;
  
  editGroupForm = this.fb.group({
    idHug:[''],
    groupName: ['', Validators.required],
    targetTo: ['', Validators.required],
    stadion: ['', Validators.required],
    date: ['', Validators.required],
    trainer: ['', Validators.required]
  });

  ngOnInit() {
    this.getGroup();
  }

  getGroup() {
    this.forUnsubscribe = this.route.params.subscribe(param => {
      this.idRoute = param['id'];
      this.dataService.getHug(param['id']).subscribe(
        result => {
          this.label = result.slice(0, 1)[0]['label'];
          if (result.slice(1) != null) {
            this.hugim = result.slice(1);
          }
          // debugger
        }
      );

      this.dataService.getTeam().subscribe(
        result => {
          debugger
          this.trainers = result;
        }
      );
    })
  }
  updateGroup() { 
    if(this.editGroupForm.valid){
      let groupId = this.editGroupForm.get('idHug').value
      let groupName = this.editGroupForm.get('groupName').value;
      let targetTo = this.editGroupForm.get('targetTo').value;
      let stadion = this.editGroupForm.get('stadion').value;
      let date = this.editGroupForm.get('date').value;
      let trainer = this.editGroupForm.get('trainer').value;
  
  
      let dataToDb = {
        groupId: groupId,
        kategory:this.idRoute,
        groupName: groupName,
        targetTo: targetTo,
        stadion: stadion,
        date:date,
        trainer: trainer
      }
      this.dataService.SendToDb('updateGroup.php',dataToDb).subscribe(result => {
        if(result.includes('SUCCESS')){
          this.openDialog('','עודכן בהצלחה');
          this.spinner = false;
          this.resetForm();
        }
        else{
          this.openDialog('שגיאה','קרתה שגיאה, נא לנסות שוב פעם מאוחר יותר');
        }
      })
    }
    else{
      this.openDialog('שגיאה','נא למלא את כל השדות');
    }
  }
  onSubmit() {
    if (this.editGroupForm.valid) {
      let groupId = this.editGroupForm.get('idHug').value
      let groupName = this.editGroupForm.get('groupName').value;
      let targetTo = this.editGroupForm.get('targetTo').value;
      let stadion = this.editGroupForm.get('stadion').value;
      let date = this.editGroupForm.get('date').value;
      let trainer = this.editGroupForm.get('trainer').value;
  
  
      let dataToDb = {
        groupId: groupId,
        kategory:this.idRoute,
        groupName: groupName,
        targetTo: targetTo,
        stadion: stadion,
        date:date,
        trainer: trainer
      }
      this.dataService.SendToDb('saveGroup.php',dataToDb).subscribe(result => {
        if(result.includes('SUCCESS')){
          this.openDialog('','קבוצה חדשה נשמרה בהצלחה');
          this.getGroup();
          this.spinner = false;
          this.resetForm();
        }
        else{
          this.openDialog('שגיאה','קרתה שגיאה, נא לנסות שוב פעם מאוחר יותר');
        }
      })
  }
  else{
    this.openDialog('שגיאה','נא למלא את כל השדות');
  }
}
  deleteHug(id: any) {
    let idGroup = +id;
    this.openConfirmDelete("האם למחוק?","hugim","id_hug",idGroup,"hug" + idGroup,true,'');

   }
  editGroup(hug:any){
    this.saveButton = false;
    this.editGroupForm.get('idHug').setValue(hug.id);
    this.editGroupForm.get('groupName').setValue(hug.name);
    this.editGroupForm.get('targetTo').setValue(hug.target);
    this.editGroupForm.get('stadion').setValue(hug.stadion);
    this.editGroupForm.get('date').setValue(hug.date);
    this.editGroupForm.get('trainer').setValue(hug.idTrainer);
    window.scroll(0,0);
  }
  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      width: "350px",
      data: { title: title, message: message }
    })
  }
  resetForm() {
    this.viewForm = false;
    setTimeout(()=>{
      this.editGroupForm.reset();
      this.viewForm = true;
    },1000);
    this.saveButton = true;
  }
  deleteHugPage(){
    this.openConfirmDelete("האם למחוק?","hugim","kategory",this.idRoute,'',true,'');
  }
  openConfirmDelete(title, db,param,id,domId,element,dataFile){
    this.dialog.open(DialogConfirmComponent,{
      width:"350px",
      data:{message:title,db:db,param:param, id:id, domId:domId,element:element, fileName:dataFile}
    })
    
  }
  ngOnDestroy() {
    this.forUnsubscribe.unsubscribe();
  }

}
