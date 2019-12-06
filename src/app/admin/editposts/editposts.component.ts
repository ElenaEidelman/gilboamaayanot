import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { GetDataService } from 'src/app/get-data.service';
import { Post } from '../../classes/post';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PagerService } from '../../pager.service';

import { FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CKEditorComponent } from 'ng2-ckeditor';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editposts',
  templateUrl: './editposts.component.html',
  styleUrls: ['./editposts.component.css']
})
export class EditpostsComponent implements OnInit, OnDestroy {


  posts: Post[];
  constructor(
    private _sanitizer: DomSanitizer,
    private dataService: GetDataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private ng2imgmax: Ng2ImgMaxService,
    private breakpointObserver: BreakpointObserver,
    private deviceDetector: DeviceDetectorService,
    private pagerServise: PagerService) {
    breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]).subscribe(result => {
      this.ifPortrait = result.breakpoints["(orientation: portrait)"];
      this.ifLandscape = result.breakpoints["(orientation: landscape)"];
    });

  }

  @ViewChild('fileName') fileName: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('editor') ckeditor: CKEditorComponent;

  uploadedImage;
  imgSrcForView: string = '';
  imgTypeForView: string = '';


  viewForm: boolean = true;
  saveButton: boolean = true;
  date = new Date();
  hours: string = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours().toString();
  minutes: string = this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes().toString();
  time: string = this.hours + ":" + this.minutes;
  img64basePath;

  spinner: boolean = false;

  ifMobile: boolean;
  ifTablet: boolean;
  ifDesktop: boolean;
  ifLandscape: boolean;
  ifPortrait: boolean;
  pages: any[];
  pager: any = {};
  pageSize: number = 10;


  imgTitle;

  editForm = this.fb.group({
    idPost: [''],
    title: ['', Validators.required],
    date: [new Date(), Validators.required],
    time: [this.time, Validators.required],
    editor: ['', Validators.required],
    img: null,
    imgTitle: ['', Validators.required]
  });

  ngOnInit() {
    this.getPosts();
    this.getDeviceInfo();
  }

  getPosts() {
    this.dataService.getPost().subscribe(result => {
      if (result.length > 0) {
        debugger
        this.posts = result;
        this.setPage(1);
      }
    });
  }

  onSubmit() {

    if (this.editForm.valid) {
      let postObj = Object.create(this.editForm.value);
      let date = postObj.date;
      let tempDate = new Date();

      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
      let year = date.getFullYear();
      let hours: string = tempDate.getHours() < 10 ? '0' + tempDate.getHours() : tempDate.getHours().toString();
      let minutes: string = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes().toString();
      let seconds = tempDate.getSeconds() < 10 ? '0' + tempDate.getSeconds() : tempDate.getSeconds().toString();
      let time: string = hours + ":" + minutes + ":" + seconds;
      let currentDate = month + "/" + day + "/" + year + " " + time;
      postObj.__proto__.date = new Date(currentDate);
      let newObj = postObj.__proto__;
      this.dataService.SendToDb('addPost.php',newObj).subscribe(result => {
        if (result == "SUCCESS") {
          this.resetForm();
          this.openDialog('', 'Post added successfully');
        }
        else if (result == "ERROR") {
          this.openDialog('ERROR', 'Something went wrong, please try again later');
        }
      });
    }
    else {
      this.openDialog('Error', 'Please fill all fields');
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];

      this.ng2imgmax.resizeImage(file, 400, 300).subscribe(
        result => {
          this.uploadedImage = result;
          reader.readAsDataURL(result);
          reader.onload = () => {
            this.editForm.get('img').setValue({
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

  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      width: "350px",
      data: { title: title, message: message }
    })
  }
  clearFile() {
    this.editForm.get('img').setValue(null);
    this.fileName.nativeElement.value = '';
  }
  editPost(post) {
    // debugger
    this.saveButton = false;
    let thisEditForm = this.editForm;

    let rDate = post['date'].split("/");
    let arDate = rDate[1] + "/" + rDate[0] + "/" + rDate[2];

    debugger
    this.editForm.get('idPost').setValue(post["id"]);
    thisEditForm.get('title').setValue(post['title']);
    thisEditForm.get('imgTitle').setValue(post['img_title']);
    thisEditForm.get('editor').setValue(post['text']);
    thisEditForm.get('time').setValue(post['time']);
    thisEditForm.get('date').setValue(new Date(arDate));
    this.editForm.get('img').setValue({
      filename: post['imgName'],
      filetype: post['imgType'],
      value: post['img_src']
    })

    // this.img64basePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:'+ post['imgType'] +';base64,' + post['img_src']);
    this.imgSrcForView = post['img_src'];
    this.imgTypeForView = post['imgType'];
    this.fileName.nativeElement.value = post['imgName'];
  }

  updatePost() {
    if (this.editForm.valid) {
      let postObj = Object.create(this.editForm.value);
      let date = postObj.date;
      let tempDate = new Date();

      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
      let year = date.getFullYear();
      let hours: string = tempDate.getHours() < 10 ? '0' + tempDate.getHours() : tempDate.getHours().toString();
      let minutes: string = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes().toString();
      let seconds = tempDate.getSeconds() < 10 ? '0' + tempDate.getSeconds() : tempDate.getSeconds().toString();
      let time: string = hours + ":" + minutes + ":" + seconds;
      let currentDate = month + "/" + day + "/" + year + " " + time;
      postObj.__proto__.date = new Date(currentDate);
      let newObj = postObj.__proto__;

      this.dataService.SendToDb('updatePost.php',newObj).subscribe(
        result => {
          this.spinner = false;
          if (result == 'SUCCESS') {
            this.saveButton = true;
            this.resetForm();
            this.openDialog('', 'Updated successfully');
          }
          else if (result == 'ERROR') {
            this.openDialog('Error', 'Something went wrong please try again later');
          }
        }
      );
    }
  }
  resetForm() {
    this.viewForm = false;
    this.editForm.get('editor').setValue('');
    this.editForm.get('img').setValue({
      filename: '',
      filetype: '',
      value: ''
    }, 0);
    // this.img64basePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:'+ '' +';base64,' + '');

    this.imgSrcForView = '';
    this.imgTypeForView = '';
    this.clearFile();
    setTimeout(() => {
      this.viewForm = true;
      this.editForm.reset();
    }, 0);
  }
  deletePost(id: number) {
    this.openConfirmDelete("Are you sure you want delete this post?", "posts", "id", id, "postId" + id, true, '');
  }

  openConfirmDelete(title, db, param, id, domId, element, dataFile) {
    this.dialog.open(DialogConfirmComponent, {
      width: "350px",
      data: { message: title, db: db, param: param, id: id, domId: domId, element: element, fileName: dataFile }
    })
  }
  //to move in pagination
  setPage(pageNumber: number) {
    if (this.ifMobile) {
      this.pager = this.pagerServise.getPagerMobile(this.posts.length, pageNumber, this.pageSize);
    }
    else {
      this.pager = this.pagerServise.getPager(this.posts.length, pageNumber, this.pageSize);
    }
    //current page posts
    this.pages = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  getDeviceInfo() {
    this.ifMobile = this.deviceDetector.isMobile();
    this.ifTablet = this.deviceDetector.isTablet();
    this.ifDesktop = this.deviceDetector.isDesktop();
  }

  destroyEditor(){
    let editor = window['CKEDITOR'];
    if(editor.instances){
      for(var editorInstance in editor.instances){
       editor.instances[editorInstance].destroy();
      }
     }
    }

  ngOnDestroy(){
    //debugger
    //this.ckeditor.ngOnDestroy();

    //this.destroyEditor();
  }
}
