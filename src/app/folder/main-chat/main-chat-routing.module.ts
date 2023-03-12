import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainChatPage } from './main-chat.page';

const routes: Routes = [
  {
    path: '',
    component: MainChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainChatPageRoutingModule {}
