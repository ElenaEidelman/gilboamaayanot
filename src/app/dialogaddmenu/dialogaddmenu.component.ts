import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { GetDataService } from '../get-data.service';
import { addMenu } from '../classes/addMenu';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

export interface DialogData {
  data: any;
  title: string;
}

@Component({
  selector: 'app-dialogaddmenu',
  templateUrl: './dialogaddmenu.component.html',
  styleUrls: ['./dialogaddmenu.component.css']
})
export class DialogaddmenuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogaddmenuComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: FormBuilder,
              private dataService: GetDataService,
              private dialog: MatDialog,
              private router: Router) {}

  typesOfMenu = [
    {heblbl:'גלריה',englbl:'gallery'},
    {heblbl:'חוגים',englbl:'hugim'},
    {heblbl:'הזנה חופשית', englbl:'wysiwyg'},
    {heblbl:'יומן',englbl:'diary'}
  ];

  addNewMenu = this.fb.group({
    engLbl: ['', Validators.required],
    hebLbl: ['', Validators.required],
    selectedType: ['', Validators.required]
  });
  showForm: boolean = true;
  spinner: boolean = false;

  ngOnInit() {
    //get selected type
    let selectedMenu = this.typesOfMenu.find(element => element.englbl == this.data.data.type);
    this.addNewMenu.get('selectedType').setValue(selectedMenu.heblbl);
    
  }

  openDialog(title: string, message: string){
    this.dialog.open(DialogComponent,{
      width: '350px',
      data: {title: title, message: message}
    })
  }
  onSubmit(){
    let hebSelectedType = this.addNewMenu.get('selectedType').value;
    let type = this.typesOfMenu.find(element => element.heblbl == hebSelectedType);
    let forMenu: addMenu = {
      hebLabel: this.addNewMenu.get('hebLbl').value,
      engLabel: this.addNewMenu.get('engLbl').value,
      type: this.data.data.type != null ? this.data.data.type : type.englbl, 
      level: +this.data.data.level + 1,
      parentMenuId: +this.data.data.id
    };
    if(this.addNewMenu.valid){
      this.spinner = true;
      this.dataService.addMenu(forMenu).subscribe(
        result => {
          if(result == 'SUCCESS'){
            this.spinner = false;
            this.openDialog('','Menu added successfully ');
            this.showForm = false;
            this.router.navigate(['admin']);
            setTimeout(() => {
              this.addNewMenu.reset();
              this.showForm = true;
            });
          }
          else if(result == 'ERROR'){
            this.openDialog('Error','There was a problem, please try later');
          }
        }
      );
    }
    //console.warn(this.addNewMenu.value);
  }

}
