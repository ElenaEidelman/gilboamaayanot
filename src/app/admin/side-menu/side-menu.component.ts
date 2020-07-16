import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, Output, EventEmitter, Inject, OnDestroy} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {GetDataService} from '../../get-data.service';
import {MenuAdmin} from '../../classes/MenuAdmin';
import { DialogaddmenuComponent } from '../../dialogaddmenu/dialogaddmenu.component';

import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';




const TREE_DATA: MenuAdmin[] =[];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  treeControl = new NestedTreeControl<MenuAdmin>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuAdmin>();
  refreshMenu: boolean;
  changedMenuSub;
  constructor(private dataService?: GetDataService,
              private router?: Router,
              private dialog?: MatDialog) {
  }

  openDialog(data:any, title:string): void {
    this.dialog.open(DialogaddmenuComponent, {
      width: '450px',
      data: {data,title}
    });
  }

  ngOnInit(){
    this.getMenu();

    //if menu was changed
    this.getChangedMenu();
  }

  hasChild = (_: number, node: MenuAdmin) => !!node.children && node.children.length > 0;

  getMenu(){
    this.dataService.getMenuForAdmin().subscribe(result => {
      this.dataSource.data = result;
    });
  }
  getChangedMenu(){
    this.changedMenuSub = this.dataService.adminMenu.subscribe(result => {
      this.dataSource.data = result;
    });
  }
  addNew(id: number, level: number, type: string){
    //debugger
    //this.router.navigate([{outlets: {'adminEdit' : 'addNewMenu'}}]);
    let setData = {
      id: id,
      level: level,
      type: type
    }
    this.openDialog(setData,'ליצור תפריט חדש');
  }
  ngOnDestroy(){
    this.changedMenuSub.unsubscribe();
  }
}


