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
import { EditgalleryComponent } from './editgallery/editgallery.component';
import { SafePipe } from '../safe.pipe';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { GetDataService } from '../get-data.service';
import { ConfirmComponent } from './edit-club-achievement/edit-club-achievement.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { WysiwysComponent } from './wysiwys/wysiwys.component';






@NgModule({
  declarations: [
    AdmindasboardComponent, 
    SideMenuComponent, 
    EditClubAchievementComponent, 
    AddnewComponent,
    DialogComponent,
    DialogaddmenuComponent,
    EditgalleryComponent,
    SafePipe,
    DialogConfirmComponent,
    ConfirmComponent,
    WysiwysComponent
  ],
  exports: [
    MaterialModule,
    AdmindasboardComponent,
    SafePipe,
    DialogConfirmComponent,
    ConfirmComponent,
    CKEditorModule
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [
    GetDataService,
    EditClubAchievementComponent
  ],
    entryComponents: [
      DialogComponent,
      DialogaddmenuComponent,
      DialogConfirmComponent,
      ConfirmComponent
    ]
})
export class AdminModule { }
