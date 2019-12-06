import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admindasboard',
  templateUrl: './admindasboard.component.html',
  styleUrls: ['./admindasboard.component.css']
})
export class AdmindasboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1023px)')
  .pipe(
    map(result => {
      return result.matches;
    })
  );
  constructor(private router: Router, private breakpointObserver: BreakpointObserver ) { }

  menuDataGet: Object = {};
  ngOnInit() {
  }
  navigateTo(page:string){
    this.router.navigate(['admin/' + page]);
  }
  logout(){
    localStorage.removeItem("usern");
    localStorage.removeItem("pass");
    this.router.navigate(['public']);
  }
}
