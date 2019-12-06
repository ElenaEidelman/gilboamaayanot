import { Component, OnInit , ViewChild, OnDestroy, ElementRef, AfterViewInit, Inject} from '@angular/core';
import {  CKEditorComponent }  from 'ng2-ckeditor';
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/get-data.service';
import { EditClubAchievementComponent } from '../edit-club-achievement/edit-club-achievement.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wysiwys',
  templateUrl: './wysiwys.component.html',
  styleUrls: ['./wysiwys.component.css']
})
export class WysiwysComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
                private fb: FormBuilder, 
                private route: ActivatedRoute, 
                private router: Router,
                private dataService: GetDataService,
                private dialog: MatDialog) { }

  @ViewChild(CKEditorComponent) ckeditor: CKEditorComponent;
  @ViewChild('fileName') fileName: ElementRef ;
  @ViewChild('fileInput') fileInput: ElementRef ;




  editForm = this.fb.group({
    editor: ['',Validators.required],
    avatar: null,
    pageId: ['']
  });
  saveButton:boolean = true;
  idRoute;
  forUnsubscribe;
  imgSrcForView: string = '';
  imgTypeForView: string = '';
  imgNameForView: string = '';
  viewForm: boolean = true;
  spinner: boolean = false;
  spinnerDelete: boolean = false;

  ngOnInit() {
    this.getOrInsertWYSIWYG();
  }

  getOrInsertWYSIWYG(){
    this.forUnsubscribe = this.route.params.subscribe(param => {
      this.idRoute = param['id'];
      this.checkIfExistOnDb(param['id']);
    })
  }
  checkIfExistOnDb(idRoute: string){
  this.dataService.checkWYSIWYG(idRoute).subscribe(result => {
    //if data exist for this wysiwyg
    if(Object.keys(result).length !== 0){
      debugger
      this.saveButton = false;
      this.editForm.get('editor').setValue(result.textcontent);
      this.editForm.get('avatar').setValue({
        filename: result.imgName,
        filetype: result.imgType,
        value: result.img
      });
      this.imgSrcForView = result.img;
      this.imgTypeForView = result.imgType;
      this.imgNameForView = result.imgName;
      this.fileName.nativeElement.value = result.imgName;;
    }
    else{
      this.saveButton = true;
      this.editForm.get('editor').setValue('');
      this.editForm.get('avatar').setValue({
        filename: '',
        filetype: '',
        value: ''
      });
      this.imgSrcForView = '';
      this.imgTypeForView = '';
      this.imgNameForView = '';
      this.fileName.nativeElement.value = '';
    }
  });
  }

  ngAfterViewChecked(){
    let editor = this.ckeditor.instance;
    editor.config.height = '200';
    editor.config.toolbarGroups = [
      { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
      { name: 'links', groups: [ 'links' ] },
      { name: 'insert', groups: [ 'insert' ] },
      '/',
      { name: 'styles', groups: [ 'styles' ] },
      { name: 'colors', groups: [ 'colors' ] },
      { name: 'tools', groups: [ 'tools' ] },
      { name: 'others', groups: [ 'others' ] },
      { name: 'about', groups: [ 'about' ] }
    ];
    editor.config.removeButtons = 'NewPage,Preview,Save';
  }
  onFileChange(event) {
    /*
    Использование картинки в base64  позволяет экономить запросы к серверу, 
    а также увеличивает скорость загрузки сайта за счет исключения ожидания ответа от сервера при загрузки очередной картинки. 
    */
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.editForm.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        })
        this.imgSrcForView = reader.result.toString().split(',')[1];
        this.imgTypeForView = file.type;
      };
    }
  }
  clearFile() {
    this.editForm.get('avatar').setValue(null);
    this.fileName.nativeElement.value = '';
  }
  onSubmit(){
    if(this.editForm.valid){
      this.spinner = true;
      this.editForm.get('pageId').setValue(this.idRoute);
      this.dataService.SendToDb('saveWYSIWYG.php',this.editForm.value).subscribe(
        result => {
          this.spinner = false;
          if(result == 'SUCCESS'){
            this.resetForm();
            this.openDialog('','Saved successfully');
            this.router.navigate(['admin']);
          }
          else if(result == 'ERROR'){
            this.openDialog('Error','Something went wrong please try again later');
          }
        }
      );
      console.log(this.editForm.value);
    }
    else{
      this.openDialog('Error','Please fill all field');
    }
  }
  updateWYSIWYG(){
    if(this.editForm.valid){
      this.spinner = true;
      this.editForm.get('pageId').setValue(this.idRoute);
      this.dataService.SendToDb('updateWYSIWYG.php',this.editForm.value).subscribe(
        result => {
          this.spinner = false;
          if(result == 'SUCCESS'){
            this.openDialog('','Updated successfully');
          }
          else if(result == 'ERROR'){
            this.openDialog('Error','Something went wrong please try again later');
          }
        }
      );
    }
    else{
      this.openDialog('Error','Please fill all field');
    }
  }
  deleteWYSIWYG(){
    //this.spinnerDelete = true;
    this.openConfirmDelete("Are you sure you want delete this page?",'wysiwyg','pageId',this.idRoute,this.idRoute,false,'');
    this.router.navigate(['admin']);
  }
  openDialog(title: string, message: string){
    this.dialog.open(DialogComponent,{
      width: '350px',
      data: {title:title, message: message}
    });
  }
  openConfirmDelete(title, db,param,id,idDom,element,fileName){
    this.dialog.open(DialogConfirmComponent,{
      width:"350px",
      data:{message:title,db:db,param:param, id:id, idDom:idDom,element:element,fileName:fileName}
    })
  }

  resetForm(){
      this.editForm.get('editor').setValue('');
      this.editForm.get('avatar').setValue({
        filename: '',
        filetype: '',
        value: ''
    },0);
    this.imgSrcForView = '';
    this.imgTypeForView = '';
    this.clearFile();
  }

  ngAfterViewInit(){

  }

  // destroyEditor(){
  //   let editor = window['CKEDITOR'];
  //   if(editor.instances){
  //     for(var editorInstance in editor.instances){
  //      editor.instances[editorInstance].destroy();
  //     }
  //    }
  //   }
  ngOnDestroy(){
    this.forUnsubscribe.unsubscribe();
    //this.destroyEditor();
  }

}