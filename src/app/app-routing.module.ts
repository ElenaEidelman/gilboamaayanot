import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NewsComponent } from './news/news.component';
import { PostsComponent } from './posts/posts.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent},
  { path: 'about', component: AboutComponent },
  { path: 'team', component: TeamComponent },
  { path: 'news', component: NewsComponent},
  /*{ path: '*', redirectTo: '404'},
  { path :'404', component: NotfoundComponent },*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
