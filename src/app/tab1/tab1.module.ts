import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CommonsModule } from '../shared/common/common.module';
import { PostDetailsComponent } from './post-detail/post-detail.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CommonsModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, PostDetailsComponent]
})
export class Tab1PageModule { }
