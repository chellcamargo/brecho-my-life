import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EnderecoService } from '../../services/endereco.service';
import { MsgService } from '../../services/msg.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from '../../models/endereco';

@Component({
  selector: 'app-endereco-add',
  templateUrl: './endereco-add.page.html',
  styleUrls: ['./endereco-add.page.scss'],
})
export class EnderecoAddPage implements OnInit {

  endereco: Endereco = new Endereco();
  userkey: string = null;

  constructor(
    private enderecoService: EnderecoService,
    protected msg: MsgService,
    private router: Router,
    private activadeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userkey = this.activadeRouter.snapshot.paramMap.get('key');
    this.endereco.userkey = this.userkey;
    //this.getEndereco(this.key)
  }

  async getUser(key) {
    if (key) {
      await this.enderecoService.get(key).subscribe(
        res => {
          this.endereco = res;
          return true;
        },
        error => {
          console.log("ERRO:", error);
          return false;
        }
      )
    }
  }

  buscaCEP() {
    this.enderecoService.pegaCEP(this.endereco.cep).subscribe(
      res => {
        console.log(res);
        if (res.erro) {
          this.msg.presentToast("CEP não localizado!");
        } else {
          //this.user = res;
          //this.user.cep = res.cep;
          this.endereco.logradouro = res.logradouro;
          this.endereco.localidade = res.localidade;
          this.endereco.bairro = res.bairro;
          this.endereco.uf = res.uf;
        }
      },
      error => {
        console.error(error)
      }
    )
  }


  salvar() {
    try {
      this.msg.presentLoading();
        this.enderecoService.add(this.endereco).then(
          res => {
            console.log('Dados Salvos firebase...', res);
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'Endereço cadastrado.');
            this.endereco = new Endereco();
            this.router.navigate(['/tabs/user-perfil',this.userkey]);
          },
          error => {
            console.error("Erro ao salvar.", error);
            this.msg.dismissLoading();
            this.msg.presentAlert("Error", "Não foi possivel salvar o endereço.");
          }
        )
    } catch (error) {
      console.error("Erro ao salvar.", error);
      this.msg.dismissLoading();
      this.msg.presentAlert("Error", "Não foi possivel conectar.");
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    if (this.getUser(this.userkey)) {
      //setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      //}, 2000);
    }
  }

}

