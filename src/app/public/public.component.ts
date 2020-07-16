import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor() { }
  
  scrollToTop: boolean = false;

  @HostListener('window:scroll', ['$event']) scrolling($event){
    let windowHeight = document.body.offsetHeight;
    let pageYOffset = window.pageYOffset;
    
    if(pageYOffset >= windowHeight){
      this.scrollToTop = true;
    }
    else{
      this.scrollToTop = false;
    }
  }

  ngOnInit() {
    let turHeight = document.getElementById('turHeight');
    if(turHeight != null ){
    document.getElementById('birthdayHeight').style.height = turHeight.offsetHeight + 'px' ;
    }
  }

  goToTop(){
    window.scrollTo(0,0);
  }

}
