import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetDataService} from '../get-data.service';
import { Diary } from '../classes/diary';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit, OnDestroy {

  constructor( private route: ActivatedRoute,
               private location: Location,
               private dataService: GetDataService) { }

  routIdParams;
  diary: Diary;
  ngOnInit() {
    this.getDiary();
  }

  getDiary(){
    /*const id = this.route.snapshot.paramMap.get('id');
    this.idDiaryParams = this.dataService.getDiary(id).subscribe(result => {
      this.diary = result;
    });*/
    this.routIdParams = this.route.params.subscribe(params => {
      let id = params['id'];
      this.dataService.getDiary(id).subscribe(result => {
        
        this.diary = result;
      })
    });
  }

  ngOnDestroy(){
    this.routIdParams.unsubscribe();
  }
}

