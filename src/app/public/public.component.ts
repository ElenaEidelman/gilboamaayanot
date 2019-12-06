import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('inside public');
    let turHeight = document.getElementById('turHeight');
    if(turHeight != null ){
    document.getElementById('birthdayHeight').style.height = turHeight.offsetHeight + 'px' ;
    }
  }

}
