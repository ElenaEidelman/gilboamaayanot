import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GetDataService } from '../get-data.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

export interface DialogData {
  message: string,
  id:string,
  domId:string,
  db: string,
  param: string,
  element: boolean //page or element of page
  fileName?:string;
}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dataService: GetDataService,
    private dialog: MatDialog,
    private route: Router) {}
  ngOnInit() {
  }
  accept(){
    this.dataService.deleteFromDb(this.data.db, this.data.param, this.data.id,this.data.element,this.data.fileName).subscribe(result => {
      debugger
    if(result == "SUCCESS"){
    this.openDialog('','Deleted Successfully ');
    document.getElementById(this.data.domId).style.display = "none";
    // this.route.navigate(['admin']);
    }
    else if(result == "ERROR"){
    this.openDialog('Error','There was a problem, please try later');
    }
    });
    this.dialogRef.close();
  }

  openDialog(title: string, message: string){
    this.dialog.open(DialogComponent,{
      width: "350px",
      data: {title: title, message: message}
    });
  }
}
