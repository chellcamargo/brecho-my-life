import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAddPage } from './user-add.page';

const routes: Routes = [
  {
    path: '',
    component: UserAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAddPageRoutingModule {}
