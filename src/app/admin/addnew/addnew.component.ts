import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../get-data.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private dataService: GetDataService) { }

  newMenuForm = this.fb.group({
    lebHeb: ['',Validators.required],
    childLabelEng: ['',Validators.required],
    childLabelHeb:['',Validators.required],
    typeOfChildMenu: ['',Validators.required]
  });

  typesOfMenu = [
    {heblbl:'גלריה',englbl:'gallery'},
    {heblbl:'חוגים',englbl:'hugim'},
    {heblbl:'הזנה חופשית', englbl:'wysiwyg'},
    {heblbl:'יומן',englbl:'diary'}
  ];

  viewForm: boolean = true;
  spinner: boolean = false;

  ngOnInit() {
  }
  onSubmit(){
    if(this.newMenuForm.valid){
      this.spinner = true;
      let dataToDb = {
        menuLbl: this.newMenuForm.get('lebHeb').value,
        childLblHeb: this.newMenuForm.get('childLabelHeb').value,
        childLblEng: this.newMenuForm.get('childLabelEng').value,
        childTypeMenu: this.newMenuForm.get('typeOfChildMenu').value
      }
      
      this.dataService.SendToDb('addNewMenuZLvl.php',dataToDb).subscribe(
        result => {
          if(result == 'SUCCESS'){
            this.openDialog('Succes','Menu was added successfully');
            this.spinner = false;
            this.resetForm();
          }
          else{
            this.spinner = false;
            this.openDialog('Error','Something went wrong');
          }
        }
      );
    }
    else{
      this.openDialog('Error','Please fill all field');
    }
  }

  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      width: "350px",
      data: { title: title, message: message }
    });
  }

  resetForm(){
    this.viewForm = false;
    setTimeout(()=>{
      this.newMenuForm.reset();
      this.viewForm = true;
    },0);
  }

}
