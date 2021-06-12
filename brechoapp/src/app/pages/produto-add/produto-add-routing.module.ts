import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoAddPage } from './produto-add.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoAddPageRoutingModule {}
