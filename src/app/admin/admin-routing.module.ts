import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindasboardComponent } from './admindasboard/admindasboard.component';
import { EditClubAchievementComponent } from './edit-club-achievement/edit-club-achievement.component';
import { AddnewComponent } from './addnew/addnew.component';
import { EditgalleryComponent }  from './editgallery/editgallery.component';
import { WysiwysComponent } from './wysiwys/wysiwys.component';

const routes: Routes = [
  // { path: '', component: AdmindasboardComponent },
  // { path: 'clubachievement', component: EditClubAchievementComponent, outlet:'adminEdit'},
  // { path: 'gallery/:id', component: EditgalleryComponent, outlet:'adminEdit'},
  // { path: 'gallery', component: EditgalleryComponent, outlet:'adminEdit'},
  // { path: 'addNewMenu', component: AddnewComponent, outlet: 'adminEdit'},
  // { path: 'wysiwyg/:id', component: WysiwysComponent ,  outlet:'adminEdit'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
