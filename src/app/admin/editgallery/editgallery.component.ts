import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GetDataService } from '../../get-data.service';
import { Image } from '../../classes/image';
import { FormBuilder , Validators} from '@angular/forms';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-editgallery',
  templateUrl: './editgallery.component.html',
  styleUrls: ['./editgallery.component.css']
})
export class EditgalleryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: GetDataService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private ng2imgmax: Ng2ImgMaxService,
              ) { }
  @ViewChild('fileInput') fileInput: ElementRef;
  id:string;
  forUnsubscribe;
  editPic: boolean;
  galleryLabel: string[];
  galleryLabelEng: string[];
  gallery: Image[];
  multyGallery: Image[][];
  galleryTrue : boolean = false;
  multyGalleryTrue : boolean = false;
  pageOfManyGalleries:boolean;
  imgListToDelete = [];
  galleryLevel:number;

  viewSecondStep: boolean = true;
  spinner: boolean = false;
  imgSrcForView = '';
  imgTypeForView;
  galleryName = '';
  imgData = new FormData();

  viewAddNewGallery:boolean = true;
  viewAddNewPic: boolean = true;
  disableRadio: boolean = false;
  radioName: string = 'Add gallery';


  addNewGallery = this.fb.group({
    engLabel:['',Validators.required],
    hebLabel:['',Validators.required]
  });
  addNewPic = this.fb.group({
    imgTitle:['']
  });


  firstStepForm = this.fb.group({
    levelOrGallery:['Addlevel']
  });
  secondStepForm = this.fb.group({
    engLabel:['',Validators.required],
    hebLabel:['',Validators.required]
  });

  ngOnInit() {
    this.forUnsubscribe = this.route.params.subscribe(param => {
      this.id = param['id'];
      this.checkGallery(param['id']);
      setTimeout(()=>{
        if(this.editPic){
          this.getPicById(param['id']);
        }
      },1000);
    });
    this.checkGallery(this.id);

  }

  checkGallery(galleryId: string){
    // document.getElementById('top').scrollIntoView();
    this.dataService.checkGallery(galleryId).subscribe(result => {
      debugger
      this.galleryLevel = result.level;
      this.radioName = (result.level == 2) ? 'Add level' : 'Add gallery to this page';
      if(result.result == 'GALLERY EXIST'){
        this.editPic = true;
        this.pageOfManyGalleries = (result.level == 3) ? true : false;
      }
      else if(result.result == 'NO GALLERY'){
        this.disableRadio = (result.level == 3) ? true : false;
        this.editPic = false;
      }
    });
  }

  getPicById(id: string){
    this.dataService.getGalleryById(id).subscribe(gallery => {
              // two dimension array
              if(Array.isArray(gallery[0])){
                this.galleryTrue = false;
                this.multyGalleryTrue = true;
      
                let newGallery2 = [];
                let galleryLabels = [];
                let galleryEngLabels = [];
                gallery.forEach((item, index) => {
                  let subGallery = [];
                  let label: string = item[0]['description'];
                  let engLeb:string = item[0]['engLabel'];
                  galleryLabels.push(label);
                  galleryEngLabels.push(engLeb);
                  let newItemStartFromIndexOne = item.slice(1);
                  newItemStartFromIndexOne.forEach((item, index) => {
                    subGallery.push({
                      id: item['id'],
                      img: item['img'],
                      description: item['description'],
                      hebDescription:item['hebDescription']
                    })
                  });
                  newGallery2.push(subGallery);
                })
                this.galleryLabel = galleryLabels;
                this.galleryLabelEng = galleryEngLabels;
                this.gallery = [];
                this.multyGallery = newGallery2;
              }
              // one dimension array
              else{
                this.multyGalleryTrue = false;
                this.galleryTrue = true;
      
                // need slice because in index 0 have hebrew name of gallery
                let galleryFromIndexOne=gallery.slice(1);
                this.galleryLabel = gallery[0]['description'];
                let newGallery = [];
                galleryFromIndexOne.forEach((item,index) => {
                  newGallery.push({
                    id: item['id'],
                    img: item['img'],
                    description: item['description'],
                    hebDescription:item['hebDescription']
                  })
                })
              this.gallery = newGallery;
              this.multyGallery = [];
              }

    });
  }

  deletePic(idPic:any, imgPath:string, event){
    if(event.checked){
      let arr = [];
      this.imgListToDelete.push({
        idPic: idPic,
        imgPath:imgPath
      });
    }
    else{
      this.imgListToDelete.forEach((element, index) => {
        if(idPic == element.idPic){
          this.imgListToDelete.splice(index,1);
        }
      });
    }

  }

  deleteSelectedPic(){
    if(this.imgListToDelete.length == 0){
      this.openDialog('Error','Please select at least one picture');
    }
    else{
      this.dataService.SendToDb('deleteSelectedPic.php',this.imgListToDelete).subscribe(
        result => {
          if(result == 'SUCCESS'){
            this.openDialog('Succes','Selected picture/s was/were deleted');
            this.imgListToDelete = [];
          }
          else if(result == 'NOT DELETED FROM SERVER'){
            this.imgListToDelete = [];
            console.log(result);
          }
          else{
            this.openDialog('Error','Somthing went wrong');
          }
        }
      );
    }
  }

  radioChange($event){
    debugger
    if($event.value == "Addpictures"){
      this.viewSecondStep = false;
    }
    else if($event.value == "Addlevel"){
      this.viewSecondStep = true;
    }
  }
  CreateChildOfPage(){
    if(this.secondStepForm.valid){
      this.spinner = true;
      let engLabel = this.secondStepForm.get('engLabel').value;
      let hebLabel = this.secondStepForm.get('hebLabel').value;
      let idPage = this.id;
      let sendData = {
        engLabel: engLabel,
        hebLabel: hebLabel,
        idPage: idPage
      }
      this.dataService.SendToDb('createChildPageOfGallery.php',sendData).subscribe(
        result => {
          debugger
          if(result == "SUCCESS"){
            this.openDialog('Succes', 'Gallery page added successfully');
            this.router.navigate(['admin']);
          }
          else{
            this.openDialog('Error', 'Something went wrong');
          }
        }
      );
      
      this.spinner = false;
    }
    else{
      this.openDialog('Error','Please fill all fields');
    }
  }
  SavePageLikeGallery(){
    let page = this.id;
    this.dataService.SendToDb('createGalleryPage.php',page).subscribe(
      result => {
        debugger
        if(result == 'SUCCESS'){
          this.openDialog('Success','Gallery created','admin/gallery/' + page);
          // setTimeout(()=>{
          //   this.router.navigate(['admin/gallery/' + page]);
          // },0)
        }
        else{
          this.openDialog('Error','Something went wrong');
        }
      }
    );
  }

  addGallery(){
    if(this.addNewGallery.valid){
      let engLabel = this.addNewGallery.get('engLabel').value;
      let hebLabel = this.addNewGallery.get('hebLabel').value;

      let dataToDb = {
        engLabel: engLabel,
        hebLabel: hebLabel,
        idPage: this.id
      }
      this.dataService.SendToDb('createNewGallery.php',dataToDb).subscribe(
        result => {
          if(result == "SUCCESS"){
            this.resetAddnewGalleryForm();
            this.openDialog('Success','Gallery added');
          }
          else{
            this.openDialog('Error','Somthing went wrong');
          }
        }
      );
    }
  }

  openDialog(title: string, message:string, navigateTo?:string){
    this.dialog.open(DialogComponent,{
      width: "350px",
      data: {title: title,message:message, navigateTo:navigateTo}
    });
  }
  onFileChange(galleryName,event) {
    this.galleryName = galleryName;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileType = file.type;
      debugger
      if(!fileType.includes("image")){
        this.openDialog('Error','Please upload only Images');
      }
      else{
        this.ng2imgmax.resizeImage(file, 900, 600).subscribe(
          result => {
            let imgfile = new File([result], result.name, { type: fileType, lastModified: Date.now() })
            this.imgData.append('name', imgfile.name);
            this.imgData.append('Imgfile',imgfile);
            let d = this.imgData;
            reader.readAsDataURL(result);
            reader.onload = () => {
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
  uploadImg(galleryName){
    if(this.addNewPic.valid && this.imgSrcForView != ''){
      this.dataService.uploadImg(this.imgData).subscribe(result => {
        if(result.includes('Error')){
          this.openDialog('', result);
        }
        else{
          let imgDataToDb = {
            title: this.addNewPic.get('imgTitle').value,
            fileName: this.imgData.get('name'),
            galleryId: galleryName,
            imgPath: 'api/uploads/imgs/gallery'
          }
          this.dataService.SendToDb('addImgToDb.php',imgDataToDb).subscribe(
            result => {
              if(result == 'SUCCESS'){
                this.viewAddNewPic = false;
                setTimeout(()=>{
                  this.addNewPic.reset();
                  this.viewAddNewPic=true;
                  this.imgSrcForView = '';
                  this.fileInput.nativeElement = '';
                  
                },100);
                this.openDialog('Success', 'Image added to gallery ');
              }
              else{
                this.openDialog('Error','Image, do not uploaded');
              }
            }
          );
        }
      });
    }
    else{
      this.openDialog('Error','Please upload image and give the title');
    }
  }
  deleteGallery(gallery: string){
    let dataToDb = {
      gallery: gallery,
      level: this.galleryLevel
    }
    this.dataService.SendToDb('deleteGallery.php',dataToDb).subscribe(
      result => {
        if(result == 'SUCCESS'){
          this.openDialog('Success','Gallery was deleted');
          this.router.navigate(['admin']);
        }
        else if(result == "ERROR"){
          this.openDialog('Error','Somthing went wrong');
        }
        else{
          this.openDialog('',result);
        }
      }
    );
  }


  ngOnDestroy(){
    this.forUnsubscribe.unsubscribe();
  }

  resetAddnewGalleryForm(){
    this.viewAddNewGallery = false;
    setTimeout(()=>{
      this.addNewGallery.reset();
      this.viewAddNewGallery = true;
    },1000);
  }

}
