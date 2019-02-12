import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../classes/menu';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Input() menu: Menu[];
  constructor() { }

  ngOnInit() {
    //setTimeout(this.createContactUsList,1000);
  }
  createContactUsList(){
    //debugger
    let ul = document.querySelector('ul.ui-menubar-root-list');
    let li = document.createElement('li');
    let a = document.createElement('a');
    let span = document.createElement('span');
    let textNode = document.createTextNode('צור קשר');
    span.appendChild(textNode);
    li.className = 'ng-star-inserted ui-menuitem ui-corner-all';
    a.className = 'ui-menuitem-link ui-corner-all ng-star-inserted ui-state-active';
    span.classList.add('ui-menuitem-text');
    a.appendChild(span);
    li.appendChild(a);
    li.addEventListener('click', function(){
      document.getElementById('contactus').scrollIntoView();
    });
    ul.appendChild(li);

  }
}
