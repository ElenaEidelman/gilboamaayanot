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

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};



const routes: Routes = [
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
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes,routerOptions) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule implements ExtraOptions{ }
