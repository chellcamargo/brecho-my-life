import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecoAddPageRoutingModule } from './endereco-add-routing.module';

import { EnderecoAddPage } from './endereco-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecoAddPageRoutingModule
  ],
  declarations: [EnderecoAddPage]
})
export class EnderecoAddPageModule {}
