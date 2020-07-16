import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { GetDataService } from '../get-data.service';
import { addMenu } from '../classes/addMenu';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

export interface DialogData {
  data: any;
  title: string;
  navigateTo?: string;
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

  linkTo:boolean = false;
  popupText: boolean = false;
  popupError: boolean = false;
  typesOfMenu = [
    {heblbl:'גלריה',englbl:'gallery'},
    {heblbl:'חוגים',englbl:'hugim'},
    {heblbl:'הזנה חופשית', englbl:'wysiwyg'},
    {heblbl:'יומן',englbl:'diary'},
    {heblbl:'לינק חיצוני', englbl:'outLink'},
    {heblbl:'לינק פנימי', englbl:'innerLink'}
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
    if(selectedMenu != undefined){
      this.addNewMenu.get('selectedType').setValue(selectedMenu.heblbl);
    }
  }
  onSelectChange(selected:any){
    if(selected.value == "לינק חיצוני" || selected.value == "לינק פנימי"){
      this.linkTo = true;
      this.addNewMenu.addControl('linkTo',new FormControl('',Validators.required));
    }
    else{
      this.linkTo = false;
      this.addNewMenu.removeControl('linkTo');
    }
    
  }
 
  openDialog(title: string, message: string, navigateTo?:string){
    this.dialog.open(DialogComponent,{
      width: '350px',
      data: {title: title, message: message,navigateTo:navigateTo}
    })
  }
  onSubmit(){
    debugger
    let hebSelectedType = this.addNewMenu.get('selectedType').value;
    let type = this.typesOfMenu.find(element => element.heblbl == hebSelectedType);
    let forMenu: addMenu = {
      hebLabel: this.addNewMenu.get('hebLbl').value,
      engLabel: this.addNewMenu.get('engLbl').value,
      type: type.englbl != undefined ? type.englbl : "", 
      level: +this.data.data.level + 1,
      parentMenuId: +this.data.data.id,
      linkOut: this.addNewMenu.get('linkTo') != undefined ? this.addNewMenu.get('linkTo').value : ""
    };
    if(this.addNewMenu.valid){
      this.spinner = true;
      this.dataService.addMenu(forMenu).subscribe(
        result => {
          if(result.includes('SUCCESS')){
            this.spinner = false;
            //this.openDialog('','התווסף בהצלחה ','admin');
            this.popupText = true;
            this.router.navigate(['admin']);
            this.dataService.getMenuForAdmin().subscribe();
            setTimeout(()=>{
              this.showForm = false;
            },2000);
            setTimeout(() => {
              this.addNewMenu.reset();
              this.showForm = true;
              this.popupText = false;
            },2000);

          }
          else if(result.includes('ERROR')){
            this.popupError = true;
            setTimeout(()=>{
              this.popupError = false;
            },2000);
            //this.openDialog('שגיאה','קרתה שגיאה, נא לנסות שוב פעם מאוחר יותר');
          }
        }
      );
    }
    //console.warn(this.addNewMenu.value);
  }


}
