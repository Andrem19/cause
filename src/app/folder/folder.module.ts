import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { MainChatPageModule } from './main-chat/main-chat.module';
import { MapPageModule } from './map/map.module';
import { PlayerInfoPage } from './player-info/player-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    MainChatPageModule,
    MapPageModule
  ],
  declarations: [FolderPage, PlayerInfoPage]
})
export class FolderPageModule {}
