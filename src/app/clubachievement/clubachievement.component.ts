import { Component, OnInit } from '@angular/core';
import { ClubAchievement } from '../classes/clubachievement';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-clubachievement',
  templateUrl: './clubachievement.component.html',
  styleUrls: ['./clubachievement.component.css']
})
export class ClubachievementComponent implements OnInit {

  clubAchivemenetes:ClubAchievement[];
  constructor(private dataService: GetDataService) { }
 
  ngOnInit() {
    this.getAchivemenets();
  }

  getAchivemenets(){
    this.dataService.getClubAchievement().subscribe(result => {
      let achiveArrFirst = [];
      let achiveArrSecond = [];
      let newAchiv = [];

      let achivLength = Math.floor(result.length / 2); // 9/2=4

      result.forEach((item,index) => {// 0 - 8
        if(index <= achivLength){
          achiveArrFirst.push(item);
        }
        else{
          achiveArrSecond.push(item);
        }
      });
      newAchiv.push(achiveArrFirst);
      newAchiv.push(achiveArrSecond);
      //debugger
      this.clubAchivemenetes = newAchiv;
    });
  }
}
