import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainChatPageRoutingModule } from './main-chat-routing.module';

import { MainChatPage } from './main-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainChatPageRoutingModule
  ],
  declarations: [MainChatPage]
})
export class MainChatPageModule {}
