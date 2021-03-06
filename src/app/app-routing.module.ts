import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NewsComponent } from './news/news.component';
import { PostsComponent } from './posts/posts.component';
import { TeamComponent } from './team/team.component';
import { PostidComponent } from './postid/postid.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SurveyComponent } from './survey/survey.component';
import { BlanksComponent } from './blanks/blanks.component';
import { DiaryComponent } from './diary/diary.component';
import { HugimComponent } from './hugim/hugim.component';
import { ClubachievementComponent } from './clubachievement/clubachievement.component';
import { RouteguardService } from './routeguard.service';
import { AdminModule } from './admin/admin.module';
import { WysiwygfrontComponent } from './wysiwyg/wysiwygfront.component';
import { PublicComponent } from './public/public.component';
import { AdmindasboardComponent } from './admin/admindasboard/admindasboard.component';

//admin
import { EditClubAchievementComponent } from './admin/edit-club-achievement/edit-club-achievement.component';
import { EditgalleryComponent } from './admin/editgallery/editgallery.component';
import { AddnewComponent } from './admin/addnew/addnew.component';
import { WysiwysComponent } from './admin/wysiwys/wysiwys.component';
import { EditpostsComponent } from './admin/editposts/editposts.component';
import { EditblanksComponent } from './admin/editblanks/editblanks.component';
import { EditSurveyComponent } from './admin/edit-survey/edit-survey.component';
import { GroupComponent } from './admin/group/group.component';
import { EditTeamComponent } from './admin/edit-team/edit-team.component';
import { EditNewsComponent } from './admin/edit-news/edit-news.component';
import { EditBirthdayComponent } from './admin/edit-birthday/edit-birthday.component';
import { EditWeeklyComponent } from './admin/edit-weekly/edit-weekly.component';
import { EditDiaryComponent } from './admin/edit-diary/edit-diary.component';
import { StatisticComponent } from './admin/statistic/statistic.component';
import { OutLinkComponent } from './admin/out-link/out-link.component';
import {InnerLinkComponent} from './admin/inner-link/inner-link.component';


const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};



const routes: Routes = [
  { path: '', redirectTo: 'public/posts', pathMatch: 'full' },
  { path: 'public', component: PublicComponent, 
  children:[
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'posts', component: PostsComponent},
    { path: 'about', component: AboutComponent },
    { path: 'team', component: TeamComponent },
    { path: 'news', component: NewsComponent},
    { path: 'post/:id', component: PostidComponent},
    { path: 'gallery/:id', component: GalleryComponent},
    { path: 'contactus', component: ContactusComponent},
    { path: 'survey', component: SurveyComponent},
    { path: 'diary/:id', component: DiaryComponent},
    { path: 'blanks', component: BlanksComponent},
    { path: 'blanks/:id', component: BlanksComponent},
    { path: 'hugim/:id', component: HugimComponent},
    { path: 'clubachievement', component: ClubachievementComponent},
    { path: 'wysiwyg/:id', component:WysiwygfrontComponent},
    { path: '**', component: NotfoundComponent},
  ]
},
{ path: 'admin', component: AdmindasboardComponent, 
  canActivate:[RouteguardService],
  children: [
    { path: 'clubachievement', component: EditClubAchievementComponent},
    { path: 'gallery/:id', component: EditgalleryComponent},
    { path: 'gallery', component: EditgalleryComponent},
    { path: 'addNewMenu', component: AddnewComponent},
    { path: 'wysiwyg/:id', component: WysiwysComponent},
    { path: 'posts', component: EditpostsComponent },
    { path: 'blanks', component:EditblanksComponent},
    { path: 'survey', component:EditSurveyComponent},
    { path: 'hugim/:id', component:GroupComponent},
    { path: 'team', component: EditTeamComponent},
    { path: 'news', component: EditNewsComponent},
    { path: 'birthdays', component: EditBirthdayComponent},
    { path: 'Weeklycolumn', component: EditWeeklyComponent },
    { path: 'diary/:id', component: EditDiaryComponent},
    { path: 'statistic', component: StatisticComponent},
    { path: 'outLink/:id/:linkId', component: OutLinkComponent},
    { path: 'innerLink/:id', component: InnerLinkComponent}
    
  ]
},
{ path: '**', redirectTo: 'public/posts', pathMatch: 'full'}
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes,routerOptions) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule implements ExtraOptions{ }
