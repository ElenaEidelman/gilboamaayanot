import { Component, OnInit, OnDestroy } from '@angular/core';
import { element } from '@angular/core/src/render3';
import {Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private router: Router) { }
  ifMobile: boolean;
  admin: boolean = localStorage.getItem('currentUser') ? true : false;
  ngOnInit() {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => document.getElementById('top').scrollIntoView());
    //window.scrollTo(0,0));
    //document.getElementById('top').scrollIntoView());
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
