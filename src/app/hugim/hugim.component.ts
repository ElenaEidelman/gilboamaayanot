import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetDataService } from '../get-data.service';
import { Hug } from '../classes/hug';

@Component({
  selector: 'app-hugim',
  templateUrl: './hugim.component.html',
  styleUrls: ['./hugim.component.css']
})
export class HugimComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private dataService: GetDataService) { }

  ngOnInit() {
    this.getHugGroup();
  }
  idGet:string;
  destroyParams;
  hugim: Hug[];
  hugByIdGet: string;
  step: number = 0;

  getHugGroup(){
    this.destroyParams = this.route.params.subscribe(params => {
      this.idGet = params['id'];
      this.dataService.getHug(this.idGet).subscribe(result => {
        //debugger
        this.hugByIdGet = result.slice(0,1)[0]['label'];
        if(result.slice(1) != null){
          this.hugim = result.slice(1);
        }
      });
    });
  }

  ngOnDestroy(){
    this.destroyParams.unsubscribe();
  }
}
