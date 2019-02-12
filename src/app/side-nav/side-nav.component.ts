import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() menuItems: MenuItem[];
  
  constructor() { }

  ngOnInit() {
    //this.insertLiToMenu();
  }

  insertLiToMenu(){
    //debugger
    let mainDiv = document.querySelector('div.ng-tns-c18-1');
    let div = document.createElement('div');
    let a = document.createElement('a');
    let span = document.createElement('span');
    let textNode = document.createTextNode('צור קשר');
    span.appendChild(textNode);
    span.classList.add('ui-menuitem-text');
    div.className = 'ng-tns-c18-1 ui-widget ui-panelmenu-header ui-state-default ui-corner-bottom';
    a.className = 'ui-panelmenu-header-link ng-tns-c18-1 ng-star-inserted ui-state-active';
    a.appendChild(span);
    div.appendChild(a);
    div.addEventListener('click', function(){
      document.getElementById('contactus').scrollIntoView();
    });
    mainDiv.appendChild(div);
  }

}
