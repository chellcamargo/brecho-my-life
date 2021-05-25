import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { UserServiceService } from '../../services/user-service.service';
import { MsgService } from '../../services/msg.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})

export class UserAddPage implements OnInit {

  user: User = new User();
  key: string = null;

  constructor(
    private storage: Storage,
    // public alertController: AlertController,
    private userService: UserServiceService,
    // public toastController: ToastController,
    protected msg: MsgService,
    private router: Router,
    private activadeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.activadeRouter.snapshot.paramMap.get('key');
    this.getUser(this.key)
  }

  async getUser(key) {
    if (key) {
      await this.userService.get(key).subscribe(
        res => {
          this.user = res;
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
    this.userService.pegaCEP(this.user.cep).subscribe(
      res => {
        console.log(res);
        if (res.erro) {
          this.msg.presentToast("CEP não localizado!");
        } else {
          //this.user = res;
          //this.user.cep = res.cep;
          this.user.logradouro = res.logradouro;
          this.user.localidade = res.localidade;
          this.user.bairro = res.bairro;
          this.user.uf = res.uf;
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
      if (this.key) {
        this.userService.update(this.user, this.key).then(
          res => {
            console.log('Dados Salvos firebase...', res);
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'Usuário atualizado.');
            this.user = new User();
            this.router.navigate(['']);
          },
          error => {
            console.error("Erro ao salvar.", error);
            this.msg.dismissLoading();
            this.msg.presentAlert("Error", "Não foi possivel atualizar.");
          }
        )
      } else {
        this.userService.add(this.user).then(
          res => {
            console.log('Dados Salvos firebase...', res);
            this.storage.set('nome', this.user.nome);
            this.storage.set('email', this.user.email);
            this.storage.set('senha', this.user.senha);
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'Usuário cadastrado.');
            this.user = new User();
            this.router.navigate(['']);
          },
          error => {
            console.error("Erro ao salvar.", error);
            this.msg.dismissLoading();
            this.msg.presentAlert("Error", "Não foi possivel salvar.");
          }
        )
      }
    } catch (error) {
      console.error("Erro ao salvar.", error);
      this.msg.dismissLoading();
      this.msg.presentAlert("Error", "Não foi possivel conectar.");
    }

  }

  doRefresh(event) {
    console.log('Begin async operation');
    if (this.getUser(this.key)) {
      //setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      //}, 2000);
    }
  }

}
