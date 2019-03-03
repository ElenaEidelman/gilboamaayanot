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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1279.99px)')
  .pipe(
    map(result => {
      return result.matches;
    })
  );
  constructor(private router: Router, private breakpointObserver: BreakpointObserver ) { }

  menuDataGet: Object = {};
  ngOnInit() {
  }
  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    this.router.navigate(['public']);
  }
}
