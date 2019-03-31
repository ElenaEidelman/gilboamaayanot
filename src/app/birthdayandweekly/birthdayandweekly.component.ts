import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GetDataService } from '../get-data.service';
import { Tur } from '../classes/tur';
import { Birthday } from '../classes/birthday';

@Component({
  selector: 'app-birthdayandweekly',
  templateUrl: './birthdayandweekly.component.html',
  styleUrls: ['./birthdayandweekly.component.css']
})
export class BirthdayandweeklyComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver,
              private dataService: GetDataService) { 
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.ifMobile = result.matches;
    });
  }
  ifMobile:boolean;
  tur: Tur ;
  birthdays: Birthday[];

  ngOnInit() {
    this.getTur();
    this.getBirthdays();


  setTimeout(()=>{
    let turHeight = document.getElementById('turHeight');
    if(turHeight != null ){
    document.getElementById('birthdayHeight').style.height = turHeight.offsetHeight + 'px' ;
    }
  },1000);


  }
getTur(){
  this.dataService.getTur().subscribe(result => {
    this.tur = result;
  })
}

getBirthdays(){
  this.dataService.getBirthday().subscribe(result => {
    //debugger
    this.birthdays = result;
  });
  }
}
