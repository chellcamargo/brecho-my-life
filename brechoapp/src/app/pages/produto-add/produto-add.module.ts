import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoAddPageRoutingModule } from './produto-add-routing.module';

import { ProdutoAddPage } from './produto-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoAddPageRoutingModule
  ],
  declarations: [ProdutoAddPage]
})
export class ProdutoAddPageModule {}
