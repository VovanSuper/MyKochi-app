import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import {
  ContentContainerComponent,
  AboutModalComponent,
  DataPrivacyModalComponent,
  HeaderComponent
} from './cmps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    PopoverMenuComponent,
    ContentContainerComponent,
    AboutModalComponent,
    DataPrivacyModalComponent,
    HeaderComponent
  ],
  declarations: [
    PopoverMenuComponent,
    ContentContainerComponent,
    AboutModalComponent,
    DataPrivacyModalComponent,
    HeaderComponent
  ]
})
export class CommonsModule { }
