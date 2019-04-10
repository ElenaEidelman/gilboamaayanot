import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetDataService } from 'src/app/get-data.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-weekly',
  templateUrl: './edit-weekly.component.html',
  styleUrls: ['./edit-weekly.component.css']
})
export class EditWeeklyComponent implements OnInit {

  constructor(
              private dataService: GetDataService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private ng2imgmax: Ng2ImgMaxService,
              private router : Router
  ) { }

  editWeeklyForm = this.fb.group({
    id: [''],
    f_title:['',Validators.required],
    date:['',Validators.required],
    s_title:['',Validators.required],
    email: ['',([Validators.required, Validators.email])],
    file:['',Validators.required],
    file_name:['',Validators.required],
    img:['']
  });
  viewForm: boolean = true;
  spinner: boolean = false;
  weeklyData;
  imgTypeForView = '';
  imgSrcForView = '';
  uploadedFile = new FormData();
  ngOnInit() {
    this.getWeekly();
  }

  getWeekly(){
    this.dataService.getTur().subscribe(
      result => {
        debugger
        this.editWeeklyForm.get('id').setValue(result[0]['id']);
        this.editWeeklyForm.get('f_title').setValue(result[0]['f_title']);
        this.editWeeklyForm.get('date').setValue(result[0]['date']);
        this.editWeeklyForm.get('s_title').setValue(result[0]['s_title']);
        this.editWeeklyForm.get('email').setValue(result[0]['mail']);
        this.editWeeklyForm.get('file').setValue(result[0]['file_src']);
        this.editWeeklyForm.get('file_name').setValue(result[0]['file_name']);
        this.imgSrcForView = result[0]['img_src'];
        this.imgTypeForView = result[0]['img_type'];


        this.weeklyData = result;
      }
    );
  }

  onFileChange(fileType:string,event) {
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let type = event.target.files[0].type;
      if(fileType == 'file'){
        if(type.includes("image")){
          this.openDialog('Error','Please upload only text files');
        }
        else{ 
          this.uploadedFile.append('name', file.name);
          this.uploadedFile.append('file',file);
          this.dataService.uploadFile(this.uploadedFile).subscribe(
            result => {
              //api/uploads/blanks/
              let notUploadedFile = result.includes("Error");
              if(notUploadedFile){
                this.spinner = false;
                this.openDialog('', result);
              }
              else{
                this.editWeeklyForm.get('file').setValue('api/uploads/blanks/'+this.uploadedFile.get('name'));
              }
            }
          );
        }

      }
      else if(fileType == 'img'){
        if(!file.type.includes('image')){
          this.openDialog('Error','Please upload only images');
        }
        else{
          let reader = new FileReader();
          this.ng2imgmax.resizeImage(file, 540, 540).subscribe(
            result => {
              reader.readAsDataURL(result);
              reader.onload = () => {
                this.editWeeklyForm.get('img').setValue({
                  // filename: result.name,
                  filetype: result.type,
                  value: reader.result.toString().split(',')[1]
                })
                this.imgSrcForView = reader.result.toString().split(',')[1];
                this.imgTypeForView = result.type;
              };
            },
            error => {
              console.log('Oh no!', error);
            }
          );
        }
      }
    }
  }
  updateWeekly(){
    if(this.editWeeklyForm.valid && this.imgSrcForView != ''){
      this.spinner = true;
      let dataToDb = {
        id: this.editWeeklyForm.get('id').value,
        f_title: this.editWeeklyForm.get('f_title').value,
        s_title: this.editWeeklyForm.get('s_title').value,
        img_src: this.imgSrcForView,
        img_type: this.imgTypeForView,
        date: this.editWeeklyForm.get('date').value,
        mail: this.editWeeklyForm.get('email').value,
        file_src: this.editWeeklyForm.get('file').value,
        file_name: this.editWeeklyForm.get('file_name').value
      }

      this.dataService.updateWeekly(dataToDb).subscribe(
        result => {
          this.spinner = false;
          if(result == 'SUCCESS'){
            this.openDialog('Succes','Weekly was updated');
            this.router.navigate(['admin']);
          }
          else{
            this.openDialog('Error','Something went wrong');
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
}
