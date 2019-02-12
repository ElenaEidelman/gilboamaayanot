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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1279.99px)')
  .pipe(
    map(result => {
      return result.matches;
    })
  );


/**
 *
   Handset: (max-width: 599.99px) and (orientation: portrait): false
            (max-width: 959.99px) and (orientation: landscape): false

   Tablet: (min-width: 600px) and (max-width: 839.99px) and (orientation: portrait): false
           (min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape): false
 */
constructor(private breakpointObserver: BreakpointObserver, private serviceData: GetDataService) {}
  items: Menu[];
  ngOnInit() {
      this.getMenu();
    }

  getMenu(){
    this.serviceData.getMenu().subscribe(menu => {
      //debugger
        this.items = menu;
      });
  }
}
