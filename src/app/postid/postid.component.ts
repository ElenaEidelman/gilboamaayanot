import { Component, isDevMode, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetDataService } from '../get-data.service';
import { Post } from '../classes/post';

@Component({
  selector: 'app-postid',
  templateUrl: './postid.component.html',
  styleUrls: ['./postid.component.css']
})
export class PostidComponent implements OnInit {

  imgSrcForView;
  imgTypeForView;
  post: Post = {
    id : 0,
    title : "",
    description: "",
    text: "",
    date: "",
    time: "",
    img_src: "",
    imgType:"",
    imgName:"",
    img_title: ""
  };
  constructor( private route: ActivatedRoute,
               private location: Location,
               private dataService: GetDataService) { }

ngOnInit() {
  this.getPost();
}

  getPost(){
    const id = +this.route.snapshot.paramMap.get('id');

    this.dataService.getPostById(id)
    .subscribe(post => {
      this.post = post;
    });
  }
  goBack(){
    this.location.back();
  }
  modePath(path:string){
    debugger
    let localPath = 'http://localhost:8080/' + path;
    let hostPath = '' + path;
    return isDevMode() == true ? localPath : hostPath;
  }
}
