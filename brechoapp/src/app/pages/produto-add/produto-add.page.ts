import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../services/msg.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-produto-add',
  templateUrl: './produto-add.page.html',
  styleUrls: ['./produto-add.page.scss'],
})
export class ProdutoAddPage implements OnInit {

  produto: Produto = new Produto();
  key: string = null;

  constructor(
    
    private produtoService: ProdutoService,
    protected msg: MsgService,
    private router: Router,
    private activadeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.activadeRouter.snapshot.paramMap.get('key');
    if(this.key){
          this.getProduto(this.key)
    }
  }

  async getProduto(key) {
    if (key) {
      await this.produtoService.get(key).subscribe(
        res => {
          this.produto = res;
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
        this.produtoService.update(this.produto, this.key).then(
          res => {
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'Produto atualizado.');
            this.produto = new Produto();
            this.router.navigate(['']);
          },
          error => {
            
            this.msg.dismissLoading();
            this.msg.presentAlert("Error", "Não foi possivel atualizar.");
          }
        )
      } else {
        this.produtoService.add(this.produto).then(
          res => {
            console.log('Dados Salvos firebase...', res);
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'Produto cadastrado.');
            this.produto = new Produto();
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
    if (this.getProduto(this.key)) {
      //setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      //}, 2000);
    }
  }

}

