import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendaAddPage } from './venda-add.page';

const routes: Routes = [
  {
    path: '',
    component: VendaAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendaAddPageRoutingModule {}
