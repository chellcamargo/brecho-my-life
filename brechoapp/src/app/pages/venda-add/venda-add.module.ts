import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendaAddPageRoutingModule } from './venda-add-routing.module';

import { VendaAddPage } from './venda-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendaAddPageRoutingModule
  ],
  declarations: [VendaAddPage]
})
export class VendaAddPageModule {}
