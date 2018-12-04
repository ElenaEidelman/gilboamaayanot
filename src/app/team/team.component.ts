import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Team } from '../classes/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team[];
  constructor(private serviceData: GetDataService) { }

  

  ngOnInit() {
    this.getTeam();
  }

getTeam(){
  let teamArr = [];
  this.serviceData.getTeam().subscribe(result => {
    let countOfTeamView :number = 8;
    let tabsCount:number = Math.ceil(result.length / countOfTeamView);
    let indexTeam:number = 0;
    let residue:number;
    let count:number = 0;
    let subArr: Team[];
    

//debugger
    if(result.length < countOfTeamView){
      subArr = [];
      while(count < result.length){
        subArr.push(result[indexTeam]);
        indexTeam++;
        count++;
      }
      teamArr.push(subArr);
      count = 0;
    }
    else{
    for(let i = 1; i <= tabsCount; i++){
      residue = result.length - ((countOfTeamView * i)-countOfTeamView);//61-9,61-18,61-27,61-36,61-45,61-54,61-63
      if(residue < countOfTeamView){
        subArr = [];
        while( count < residue){
          subArr.push(result[indexTeam]);
          indexTeam++;
          count++;
        }
        count = 0;
      }
      else{
        subArr = [];
        while(count < countOfTeamView){
          subArr.push(result[indexTeam]);
          indexTeam++;
          count++;
        }
        count = 0;
      }
      teamArr.push(subArr);
    }
  }
    this.team = teamArr; 
  });
  }
}
