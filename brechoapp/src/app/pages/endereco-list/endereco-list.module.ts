import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecoListPageRoutingModule } from './endereco-list-routing.module';

import { EnderecoListPage } from './endereco-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecoListPageRoutingModule
  ],
  declarations: [EnderecoListPage]
})
export class EnderecoListPageModule {}
