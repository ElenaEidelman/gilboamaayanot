import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdmindasboardComponent } from './admindasboard/admindasboard.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {MaterialModule} from '../MaterialModule';
import { EditClubAchievementComponent } from './edit-club-achievement/edit-club-achievement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddnewComponent } from './addnew/addnew.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogaddmenuComponent } from '../dialogaddmenu/dialogaddmenu.component';





@NgModule({
  declarations: [
    AdmindasboardComponent, 
    SideMenuComponent, 
    EditClubAchievementComponent, 
    AddnewComponent,
    DialogComponent,
    DialogaddmenuComponent
  ],
  exports: [
    MaterialModule,
    AdmindasboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
    entryComponents: [
      DialogComponent,
      DialogaddmenuComponent
    ]
})
export class AdminModule { }
