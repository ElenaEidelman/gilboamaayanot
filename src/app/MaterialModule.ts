import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatTreeModule} from '@angular/material/tree';
import {MatSelectModule} from '@angular/material/select';







@NgModule({
    imports:[
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatGridListModule,
        MatStepperModule,
        MatExpansionModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatProgressBarModule,
        MatRadioModule,
        MatTreeModule,
        MatSelectModule
    ],
    exports:[
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatGridListModule,
        MatStepperModule,
        MatExpansionModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatProgressBarModule,
        MatRadioModule,
        MatTreeModule,
        MatSelectModule
    ]
})

export class MaterialModule { }