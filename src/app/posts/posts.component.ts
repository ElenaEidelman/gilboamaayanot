import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Post } from '../classes/post';
import { PagerService } from '../pager.service';
import { MatStepper } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  constructor(private dataService: GetDataService,
    private pagerServise: PagerService,
    private breakpointObserver: BreakpointObserver,
    private deviceDetector: DeviceDetectorService) {
    breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]).subscribe(result => {
      this.ifPortrait = result.breakpoints["(orientation: portrait)"];
      this.ifLandscape = result.breakpoints["(orientation: landscape)"];
    });
  }

  ifMobile: boolean;
  ifTablet: boolean;
  ifDesktop: boolean;
  ifLandscape: boolean;
  ifPortrait: boolean;
  posts;
  pages: any[];
  pager: any = {};
  pageSize: number = 6;
  content_img: string;
  imgSrcForView;
  imgTypeForView;
  imgTitle;
  spinner: boolean = false;
  @ViewChild('stepper') stepper: MatStepper;

  postsLength: number = 0;

  ngOnInit() {
    // this.getPost();
    this.getLengthOfPosts();
    this.getDeviceInfo();
  }
  selectionChanged(event) {
    //console.log(event);
  }
  clickStep(obj) {
    this.imgSrcForView = obj['img_src'];;
    this.imgTypeForView = obj['imgType'];
    this.imgTitle = obj['img_title'];
  }

  // getPost(){
  //   this.spinner = true;
  //   this.dataService.getPost().subscribe(result => {
  //     if(result.length > 0){
  //       this.imgSrcForView = result[0].img_src;
  //       this.imgTypeForView = result[0].imgType;
  //       this.imgTitle = result[0].img_title;
  //       this.posts = result.slice(0, result.length - 1);
  //       this.postsLength = +(result.slice(result.length-1)[0]['postsCount']);
  //       this.setPage(1);
  //     }
  //     this.spinner = false;
  //   });
  //   document.getElementById('top').scrollIntoView();
  // }

  getLengthOfPosts() {
    this.dataService.getLengthOfPosts().subscribe(result => {
      this.postsLength = +(result['postsCount']);
      this.setPage(1);
    })
  }

  //create img path depending on mode(development or not)
  modePath(path: string) {
    debugger
    let localPath = 'http://localhost:8080' + path;
    let hostPath = '' + path;
    let test = isDevMode();
    debugger
    // return isDevMode() == true ? localPath : hostPath;
    return hostPath;
  }
  //to move in pagination
  setPage(pageNumber: number) {
    this.spinner = true;
    if (this.ifMobile) {
      this.pager = this.pagerServise.getPagerMobile(this.postsLength, pageNumber, this.pageSize);
    }
    else {
      this.pager = this.pagerServise.getPager(this.postsLength, pageNumber, this.pageSize);
    }
    //current page posts

    this.dataService.getPostByPage(pageNumber - 1).subscribe(result => {
      this.spinner = false;
      this.posts = result;
      this.pages = this.posts;
    })

    // this.pages = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // this.content_img = 'assets/img/' +  this.pages[0].img_src;; 
    // this.imgSrcForView = this.pages[0].img_src;

    //set index of stepper to 0 if move on pagination
    // if(this.stepper.selectedIndex > 0){
    //   this.stepper.selectedIndex = 0;
    // }
  }

  getDeviceInfo() {
    this.ifMobile = this.deviceDetector.isMobile();
    this.ifTablet = this.deviceDetector.isTablet();
    this.ifDesktop = this.deviceDetector.isDesktop();
  }
}
