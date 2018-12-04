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
  }

}
