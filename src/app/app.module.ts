import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './MaterialModule';
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

import { HttpClientModule }    from '@angular/common/http';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialNavComponent,
    PostsComponent,
    TopNavComponent,
    SideNavComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    PanelMenuModule,
    MenubarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
