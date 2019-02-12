import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Post } from '../classes/post';
import { PagerService } from '../pager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  pages: any[];
  pager: any = {};
  pageSize: number = 5;
  content_img:string;

  constructor(private dataService: GetDataService, private pagerServise: PagerService) { }

  ngOnInit() {
    this.getPost();
  }
  clickStep(obj){
    let obj_img:string = obj['img_src'];
    this.content_img = 'assets/img/' +  obj_img;
  }
  getPost(){
    this.dataService.getPost().subscribe(result => {
      this.content_img = 'assets/img/' + result[0].img_src;
      this.posts = result;
      this.setPage(1);
    });
  }

  setPage(pageNumber: number){
    this.pager = this.pagerServise.getPager(this.posts.length, pageNumber, this.pageSize);

    //current page posts
    this.pages = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.content_img = 'assets/img/' +  this.pages[0].img_src; 
    console.log(this.pager);
  }
}
