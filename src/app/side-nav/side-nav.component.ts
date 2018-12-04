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
  }

}
