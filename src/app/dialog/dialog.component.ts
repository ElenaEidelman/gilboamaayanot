import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  title: string;
  message: string;
  navigateTo?:string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private route: Router) {}
    mySubscription: any;

  ngOnInit() {
  }

  close(){
    debugger
    if(this.data['navigateTo'] != ''){
      // this.route.navigateByUrl('SideMenuComponent', { skipLocationChange: true }).then(() => {
      //   debugger
      this.route.navigate([this.data['navigateTo']]);
      // }); 
    }
    // if(this.data['navigateTo'] != ''){
    //   this.route.navigate([this.data['navigateTo']]);
    // }
    // location.reload();
  }
}
