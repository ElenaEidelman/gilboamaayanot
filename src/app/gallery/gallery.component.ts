import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetDataService } from '../get-data.service';
import {Image} from '@ks89/angular-modal-gallery';
import { isArray } from 'util';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private location: Location,
              private dataService: GetDataService) {}

  ngOnInit() {
    this.getGallery();
  }

  galleryLabel: string[];
  gallery: Image[];
  multyGallery: Image[][];
  galleryTrue : boolean = false;
  multyGalleryTrue : boolean = false;
  paramsSub;



  getGallery(){
    //to navigate between some component but another parameters
    // we need first to subscribe and second to destroy 
    
    this.paramsSub = this.route.params.subscribe(params =>  {
      let galleryId: string = params['id'];
      this.dataService.getGalleryById(galleryId)
      .subscribe(gallery => {
        //debugger
        document.getElementById('top').scrollIntoView();
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
              subGallery.push(new Image(index, {
                img: item['img'],
                description: item['description']
              }))
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
            newGallery.push(new Image(index,{
              img: item['img'],
              description: item['description']
            }))
          })
        this.gallery = newGallery;
        this.multyGallery = [];
        }
      });
    });
  }
  goBack(){
    this.location.back();
  }

  ngOnDestroy(){
    this.paramsSub.unsubscribe();
  }
  
}
