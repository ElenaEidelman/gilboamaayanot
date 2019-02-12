import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './MaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
//import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenubarModule} from 'primeng/menubar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialNavComponent } from './material-nav/material-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PostsComponent } from './posts/posts.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TeamComponent } from './team/team.component';

import { HttpClientModule }    from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { NewsComponent } from './news/news.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PostidComponent } from './postid/postid.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { GalleryComponent } from './gallery/gallery.component';

// ********************** angular-modal-gallery *****************************
import 'hammerjs'; // Mandatory for angular-modal-gallery 3.x.x or greater (`npm i --save hammerjs`)
import 'mousetrap'; // Mandatory for angular-modal-gallery 3.x.x or greater (`npm i --save mousetrap`)
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ContactusComponent } from './contactus/contactus.component';

import { DialogSurvey } from './survey/survey.component';
import { BirthdayandweeklyComponent } from './birthdayandweekly/birthdayandweekly.component';
import { SurveyComponent } from './survey/survey.component';
import { DiaryComponent } from './diary/diary.component';
import { SafePipe } from './safe.pipe';
import { IframePipe } from './iframe.pipe';
import { BlanksComponent } from './blanks/blanks.component';
import { HugimComponent } from './hugim/hugim.component';
import { ClubachievementComponent } from './clubachievement/clubachievement.component';
import { AdminModule } from './admin/admin.module';







@NgModule({
  declarations: [
    AppComponent,
    MaterialNavComponent,
    PostsComponent,
    TopNavComponent,
    SideNavComponent,
    TeamComponent,
    FooterComponent,
    AboutComponent,
    NotfoundComponent,
    NewsComponent,
    PaginationComponent,
    PostidComponent,
    GalleryComponent,
    ContactusComponent,
    BirthdayandweeklyComponent,
    SurveyComponent,
    DialogSurvey,
    DiaryComponent,
    SafePipe,
    IframePipe,
    BlanksComponent,
    HugimComponent,
    ClubachievementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    PanelMenuModule,
    MenubarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularEditorModule,
    AdminModule,
    GalleryModule.forRoot(),
    DeviceDetectorModule.forRoot()
  ],
  entryComponents: [
    DialogSurvey
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
