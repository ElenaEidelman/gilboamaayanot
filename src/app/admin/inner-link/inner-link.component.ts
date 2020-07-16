import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/get-data.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/dialog-confirm/dialog-confirm.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-inner-link',
  templateUrl: './inner-link.component.html',
  styleUrls: ['./inner-link.component.css']
})
export class InnerLinkComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private getData: GetDataService,private dialog: MatDialog) { }
  forUnsubscribe;
  id;
  linkId;
  url;
  spinner:boolean = false;
  urlsObj;
  db;
  inputLink = new FormControl('',Validators.required);
  linkHebName = new FormControl('',Validators.required);
  ngOnInit() {
    this.getLink();
  }

  getLink(){
    this.forUnsubscribe = this.route.params.subscribe(param => {
      this.id = param['id'];
      this.linkId = param['id'];
      //this.urlsObj = JSON.parse(localStorage.getItem("adminMenu"));
      this.getData.getMenuForAdmin().subscribe(result => {
        //this.urlsObj = JSON.parse(localStorage.getItem("adminMenu"));
        this.urlsObj = result;
              //get link
      this.urlsObj.forEach(element => {
        if(element.children != undefined){
          element.children.forEach(elmChild => {
            if(elmChild.children != undefined){
              elmChild.children.forEach(elmThirdLvl => {
                if(elmThirdLvl.id == param['id'] && elmThirdLvl.type == 'innerLink'){
                  this.inputLink.setValue(elmThirdLvl.frontLink);
                  this.linkHebName.setValue(elmThirdLvl.name); 
                  this.db = elmThirdLvl.level == 2 ? "submenu" : elmThirdLvl.level == 3 ? "submenuthirdlevel" : "";
                }
              });
            }
            else{
              if(elmChild.id == param['id'] && elmChild.type == 'innerLink'){
                this.inputLink.setValue(elmChild.frontLink);
                this.linkHebName.setValue(elmChild.name);
                this.db = elmChild.level == 2 ? "submenu" : elmChild.level == 3 ? "submenuthirdlevel" : "";
              }
            }
          });
        }
      });
      });
    });
  }
  onDelete(){
    debugger
    this.urlsObj.forEach(element => {
     try{
      element.children.forEach(elmChild => {
        if(elmChild.children != undefined){
          elmChild.children.forEach(elmThirdLvl => {
            if(elmThirdLvl.id == this.linkId && elmThirdLvl.type == 'innerLink'){
              debugger
              this.db = elmThirdLvl.level == 2 ? "submenu" : elmThirdLvl.level == 3 ? "submenuthirdlevel" : "";
              this.spinner = true;
              this.openConfirmDelete("האם למחוק?",this.db,"id",elmThirdLvl.id,"",false,"");
            }
            else{
              this.spinner = false;
            }
          });
        }
        else{
          if(elmChild.id == this.linkId && elmChild.type == 'innerLink'){
            debugger
            this.db = elmChild.level == 2 ? "submenu" : elmChild.level == 3 ? "submenuthirdlevel" : "";
            this.spinner = true;
            this.openConfirmDelete("האם למחוק?",this.db,"id",elmChild.id,"",false,"");
          }
          else{
            this.spinner = false;
          }
        }
      });
     }
     catch(error){}
   });
    //this.getData.deleteFromDb()
  }
  onSubmit(){
    this.spinner = true;
    debugger
    let outLnkObj = {
      id: this.id,
      db: this.db,
      link: this.inputLink.value,
      linkName: this.linkHebName.value
    }
    this.getData.SendToDb('saveOutLnk.php',outLnkObj).subscribe(result => {
      if(result.includes('SUCCESS')){
        this.openDialog('עודכן בהצלחה','');
        this.spinner = false;
        //this.inputLink.setValue(outLnkObj.link);
        this.getLink();
      }
      else{
        this.openDialog('שגיאה','קרתה שגיאה, נא לנסות שוב פעם מאוחר יותר');
        this.spinner = false;
      }
    });
  }
openDialog(title: string, message: string){
    this.dialog.open(DialogComponent,{
      width: '350px',
      data: {title:title, message: message}
    });
  }
  openConfirmDelete(title, db,param,id,domId,element,dataFile){
    debugger
    this.dialog.open(DialogConfirmComponent,{
      width:"350px",
      data:{message:title,db:db,param:param, id:id, domId:domId,element:element, fileName:dataFile}
    })
  }
  ngOnDestroy(){
    this.forUnsubscribe.unsubscribe();
  }
}

