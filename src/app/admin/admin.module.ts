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
import { CKEditorModule } from 'ng2-ckeditor';
import { WysiwysComponent } from './wysiwys/wysiwys.component';
import { EditpostsComponent } from './editposts/editposts.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { EditblanksComponent } from './editblanks/editblanks.component';
// import { FileSelectDirective } from 'ng2-file-upload';
import { HttpClientModule }    from '@angular/common/http';
import { PaginationComponent } from '../pagination/pagination.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { GroupComponent } from './group/group.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { EditBirthdayComponent } from './edit-birthday/edit-birthday.component';
import { EditWeeklyComponent } from './edit-weekly/edit-weekly.component';
import { EditDiaryComponent } from './edit-diary/edit-diary.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ChartsModule } from 'ng2-charts';


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
    WysiwysComponent,
    EditpostsComponent,
    EditblanksComponent,
    // FileSelectDirective,
    PaginationComponent,
    EditSurveyComponent,
    GroupComponent,
    EditTeamComponent,
    EditNewsComponent,
    EditBirthdayComponent,
    EditWeeklyComponent,
    EditDiaryComponent,
    StatisticComponent
  ],
  exports: [
    MaterialModule,
    AdmindasboardComponent,
    SafePipe,
    DialogConfirmComponent,
    CKEditorModule,
    Ng2ImgMaxModule,
    HttpClientModule,
    PaginationComponent,
    ChartsModule
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CKEditorModule,
    Ng2ImgMaxModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    GetDataService,
    EditClubAchievementComponent,
  ],
    entryComponents: [
      DialogComponent,
      DialogaddmenuComponent,
      DialogConfirmComponent,
    ]
})
export class AdminModule { }
