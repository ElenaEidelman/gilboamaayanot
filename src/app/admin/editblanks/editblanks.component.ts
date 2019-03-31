import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { GetDataService} from '../../get-data.service';
import { Blank } from '../../classes/blank';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';



@Component({
  selector: 'app-editblanks',
  templateUrl: './editblanks.component.html',
  styleUrls: ['./editblanks.component.css']
})
export class EditblanksComponent implements OnInit {

  selectedFile : File= null;
  formData = new FormData();
  step = 0;
  blanks: Blank[];
  spinner: boolean = false;
  viewForm: boolean = true;

  addBlankGroup = new FormGroup({
    blankTitle : new FormControl('', Validators.required)
  });

  addCategoryGroup = new FormGroup({
    categoryEngName: new FormControl('', Validators.required),
    categoryHebName : new FormControl('',Validators.required),
    fileTitle: new FormControl('',Validators.required)
  });
  

  constructor(private dataService: GetDataService, private dialog: MatDialog) { }


  ngOnInit() {
    this.getBlanks();
  }
  onFileSelectded(event){
    let elem = event.target;
    if(elem.files.length > 0){
      let type = elem.files[0].type;
      if(type.includes("image")){
        this.openDialog('Error','Please upload only text files');
      }
      else{ 
        this.formData.append('name', elem.files[0].name);
        this.formData.append('file',elem.files[0]);
      }
    }
  }

  upload(blankCategory:string, blankHebCategory: string){
   if(this.addBlankGroup.valid || this.addCategoryGroup.valid){
     this.spinner = true;
    let title = this.addBlankGroup.get("blankTitle").value != "" ? this.addBlankGroup.get("blankTitle").value : this.addCategoryGroup.get("fileTitle").value ;
    let fileName = this.formData.get('name');
    let blank: Blank = {
      file: fileName.toString(),
      title: title,
      category: blankCategory,
      categoryHeb: blankHebCategory
    }

    this.dataService.uploadFile(this.formData).subscribe(data => {
      let notUploadedFile: boolean = false;
      notUploadedFile = data.includes("Error");
      if(notUploadedFile){
        this.spinner = false;
        this.openDialog('', data);
      }
      else{
        this.dataService.addBlankToDb(blank).subscribe(result => {
          if(result == "SUCCESS"){
            this.spinner = false;
            this.resetForm();
            this.formData.append('name', '');
            this.formData.append('file','');
            this.openDialog('','Blank added successfully');
          }
          else{
            this.spinner = false;
            this.openDialog('Error ','blank not added');
          }
        });
      }
    },
    error => {
      console.log('Error', error);
    });
   }
   else{
    this.openDialog('Error','Please fill all fields');
   }
  }


  getBlanks(){
    this.dataService.getBlanks().subscribe(result => {
      this.blanks = result;
    });
  }
  deleteBlank(id:number, nameFile:string){
    this.openConfirmDelete('Delete this blank?','tfasim','id_tofes',id,id,true,nameFile);
  }
  deleteBlankCategory(category: string){
    this.openConfirmDelete('Delete this category of blanks','tfasim','kategory',category,category,true,'');
  }

  openConfirmDelete(title, db,param,id,domId,element, fileName){
    this.dialog.open(DialogConfirmComponent,{
      width:"350px",
      data:{message:title,db:db,param:param, id:id, domId: id,element: element, fileName: fileName}
    })
  }
  openDialog(title, message){
    this.dialog.open(DialogComponent,{
      width:"350px",
      data:{title:title,message:message}
    })
  }
  resetForm(){
    this.viewForm = false;
    setTimeout(()=>{
      this.addBlankGroup.reset();
      this.addCategoryGroup.reset();
      this.viewForm = true;
    },0);
  }
}
