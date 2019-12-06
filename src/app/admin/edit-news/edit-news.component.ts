import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { GetDataService } from 'src/app/get-data.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
  // encapsulation: ViewEncapsulation.Native
})
export class EditNewsComponent implements OnInit {

  constructor(
              private dataService: GetDataService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private ng2imgmax: Ng2ImgMaxService,
              ) { }
            

  ngOnInit() {
    this.getNews();
  }
  news;
  viewForm: boolean = true;
  imgSrcForView = '';
  imgTypeForView;
  spinner: boolean = false;
  saveButton:boolean = true;
  uploadedImage;

  editNewsForm = this.fb.group({
    id:[''],
    title:['',Validators.required],
    description:['',Validators.required],
    img:['']
  });

  getNews(){
    this.dataService.getNews().subscribe(
      result => {
        this.news = result;
      }
    );
  }

  deleteNews(id: any){
    this.openConfirmDelete('Are you sure you want to delete this news?','news','id_news',id,'news'+id,true,'');
  }
  editNews(news:any){
    this.editNewsForm.get('id').setValue(news.id);
    this.editNewsForm.get('title').setValue(news.title);
    this.editNewsForm.get('description').setValue(news.description);
    this.imgSrcForView = news.img_value;
    this.imgTypeForView = news.img_type;
    this.editNewsForm.get('img').setValue({
      filename: '',
      filetype: news.img_type,
      value: news.img_value
    })
    this.saveButton = false;
  }
  resetForm() {
    this.viewForm = false;
    setTimeout(() => {
      this.editNewsForm.reset();
      this.viewForm = true;
      this.imgSrcForView = '';
      this.imgTypeForView = '';
    }, 1000);
    this.imgSrcForView = '';
    this.imgTypeForView = '';
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];

      this.ng2imgmax.resizeImage(file, 400, 300).subscribe(
        result => {
          this.uploadedImage = result;
          reader.readAsDataURL(result);
          reader.onload = () => {
            this.editNewsForm.get('img').setValue({
              filename: result.name,
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
  onSubmit(){
    if(this.editNewsForm.valid){
      let dataToDb = this.createDataToDb();
      this.dataService.SendToDb('addNews.php',dataToDb).subscribe(
        result=>{
          if(result == 'SUCCESS'){
            this.openDialog('Success','News added successfully');
            this.resetForm();
          }
          else{
            this.openDialog('Error','Something went wrong');
            console.log(result);
          }
        }
      );
    }
    else{
      this.openDialog('Error','Please fill all field');
    }
  }
  updateNews(){
    if(this.editNewsForm.valid){

      let dataToDb = this.createDataToDb();
      this.dataService.SendToDb('updateNews.php',dataToDb).subscribe(
        result=>{
          if(result == 'SUCCESS'){
            this.openDialog('Success','News updated successfully');
            this.resetForm();
            this.saveButton = true;
          }
          else{
            this.openDialog('Error','Something went wrong');
            console.log(result);
          }
        }
      );
    }
    else{
      this.openDialog('Error','Please fill all field');
    }
  }

  createDataToDb(){
    let date = new Date();
    let hours:string = date.getHours() < 10 ? "0" + date.getHours() : date.getHours().toString();
    let minutes:string = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes().toString();
    let seconds: string = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds().toString();
    let time:string = hours + ":" + minutes + ":" + seconds;

    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let year = date.getFullYear();
    let curDate = month + "/" + day + "/" + year + " " + time;

    let dataToDb = {
      id: this.editNewsForm.value.id,
      title: this.editNewsForm.value.title,
      description: this.editNewsForm.value.description,
      date:new Date(curDate),
      time : time,
      imgType: this.editNewsForm.value.img.filetype != undefined ? this.editNewsForm.value.img.filetype : null ,
      imgValue: this.editNewsForm.value.img.value != undefined ? this.editNewsForm.value.img.value : null
    }
    return dataToDb;
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
