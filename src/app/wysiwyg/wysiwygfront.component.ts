import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../get-data.service';


@Component({
  selector: 'app-wysiwygfront',
  templateUrl: './wysiwygfront.component.html',
  styleUrls: ['./wysiwygfront.component.css']
})
export class WysiwygfrontComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dataService: GetDataService) { }
  unsubscribe;
  wysiwygPageId:string;
  wysiwygData: any;

  ngOnInit() {
    this.unsubscribe = this.route.params.subscribe(param => {
     this.wysiwygPageId = param['id'];
     this.getWYSIWYG(param['id']);
    });
  }

  ngOnDestroy(){

  }
  getWYSIWYG(pageId: string){
   this.dataService.getWYSIWYG(pageId).subscribe(result => {
    this.wysiwygData = result;
   });
  }
}
