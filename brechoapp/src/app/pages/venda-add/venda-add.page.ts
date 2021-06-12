import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../services/msg.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';


@Component({
  selector: 'app-venda-add',
  templateUrl: './venda-add.page.html',
  styleUrls: ['./venda-add.page.scss'],
})
export class VendaAddPage implements OnInit {

  venda: Venda = new Venda();
  key: string = null;

  constructor(
    
    private vendaService: VendaService,
    protected msg: MsgService,
    private router: Router,
    private activadeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.activadeRouter.snapshot.paramMap.get('key');
    this.getvenda(this.key)
  }

  async getvenda(key) {
    if (key) {
      await this.vendaService.get(key).subscribe(
        res => {
          this.venda = res;
          return true;
        },
        error => {
          console.log("ERRO:", error);
          return false;
        }
      )
    }
  }

  salvar() {
    try {
      this.msg.presentLoading();
      if (this.key) {
        this.vendaService.update(this.venda, this.key).then(
          res => {
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'venda atualizado.');
            this.venda = new Venda();
            this.router.navigate(['']);
          },
          error => {
            
            this.msg.dismissLoading();
            this.msg.presentAlert("Error", "Não foi possivel atualizar.");
          }
        )
      } else {
        this.vendaService.add(this.venda).then(
          res => {
            console.log('Dados Salvos firebase...', res);
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'venda cadastrado.');
            this.venda = new Venda();
            this.router.navigate(['']);
          },
          error => {
            
            this.msg.dismissLoading();
            this.msg.presentAlert("Error", "Não foi possivel salvar.");
          }
        )
      }
    } catch (error) {
      
      this.msg.dismissLoading();
      this.msg.presentAlert("Error", "Não foi possivel conectar.");
    }

  }

  doRefresh(event) {
    console.log('Begin async operation');
    if (this.getvenda(this.key)) {
      //setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      //}, 2000);
    }
  }

}

