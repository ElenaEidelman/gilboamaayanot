import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GetDataService } from '../get-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../classes/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  /*isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => {
      return result.matches;
    })
  );*/
  team: Team[];
  ifMobile:boolean;
  constructor(private serviceData: GetDataService, private breakpointObserver: BreakpointObserver) { 
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.ifMobile = result.matches;
    });
  }

  

  ngOnInit() {
    this.getTeam();
    setTimeout(()=>{
      let el = document.getElementsByClassName('mat-tab-header');
      debugger
          el[0].classList.add('mat-tab-header-pagination-controls-enabled');
    },1000);
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
    

  debugger
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
