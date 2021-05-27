import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnderecoListPage } from './endereco-list.page';

const routes: Routes = [
  {
    path: '',
    component: EnderecoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecoListPageRoutingModule {}
