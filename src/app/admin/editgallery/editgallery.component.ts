import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetDataService } from '../../get-data.service';
import { Image } from '../../classes/image';
import { FormBuilder , Validators} from '@angular/forms';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-editgallery',
  templateUrl: './editgallery.component.html',
  styleUrls: ['./editgallery.component.css']
})
export class EditgalleryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private dataService: GetDataService,
              private fb: FormBuilder,
              private dialog: MatDialog
              ) { }
  id:string;
  forUnsubscribe;
  editPic: boolean = false;
  galleryLabel: string[];
  gallery: Image[];
  multyGallery: Image[][];
  galleryTrue : boolean = false;
  multyGalleryTrue : boolean = false;
  
  addNewPic = this.fb.group({
    src:['',Validators.required],
    gallery_id:[''],
    hebDescription:['',Validators]
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
    this.dataService.checkGallery(galleryId).subscribe(result => {
      if(result == 'GALLERY EXIST'){
        this.editPic = true;
      }
      else if(result == 'NO GALLERY'){
        this.editPic = false;
      }
    });
  }

  getPicById(id: string){
    this.dataService.getGalleryById(id).subscribe(gallery => {
      //debugger
              // two dimension array
              if(Array.isArray(gallery[0])){
                this.galleryTrue = false;
                this.multyGalleryTrue = true;
      
                let newGallery2 = [];
                let galleryLabels = [];
                gallery.forEach((item, index) => {
                  let subGallery = [];
                  let label: string = item[0]['description'];
                  galleryLabels.push(label);
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

  deletePic(id:number){
    let dialog = confirm('האם למחוק תמונה?');
    if(dialog){
      console.log('deleted');
    }
  }

  ngOnDestroy(){
    this.forUnsubscribe.unsubscribe();
  }

}
