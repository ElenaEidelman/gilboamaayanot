import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MenuItem} from 'primeng/api';
import { GetDataService } from '../get-data.service';
import { Menu } from '../classes/menu';

@Component({
  selector: 'app-material-nav',
  templateUrl: './material-nav.component.html',
  styleUrls: ['./material-nav.component.css'],
})
export class MaterialNavComponent {

  @Input() isHandset$:boolean;

  constructor(private breakpointObserver: BreakpointObserver, private serviceData: GetDataService) {}
  items: Menu[];
  ngOnInit() {
      this.getMenu();
    }

  getMenu(){
    this.serviceData.getMenu().subscribe(menu => {
        this.items = menu;
      });
  }
}
