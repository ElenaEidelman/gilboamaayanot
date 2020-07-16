import { Component, OnInit } from '@angular/core';
import { Blank } from '../classes/blank';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-blanks',
  templateUrl: './blanks.component.html',
  styleUrls: ['./blanks.component.css']
})
export class BlanksComponent implements OnInit {

  constructor(private dataService: GetDataService,
              private route: ActivatedRoute,
              private location: Location) { }
  
  id:string;
  ngOnInit() {
    this.getBlanks();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
    setTimeout(() => {
      document.getElementById(this.id).scrollIntoView(true);
    },500);
    }
  }
  step = 0;
  blanks: Blank[];

  getBlanks(){
    this.dataService.getBlanks().subscribe(result => {
      this.blanks = result;
    });
  }
}
