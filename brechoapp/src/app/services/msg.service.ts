import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(
    public alertController: AlertController,
    public toastController:ToastController,
    public loadingController: LoadingController
    ) { }

    async presentAlert(tipo:string, texto:string) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: tipo,
        //subHeader: 'Subtitle',
        message: texto,
        buttons: ['OK']
      });
      await alert.present();
    }

    async presentToast(texto: string) {
      const toast = await this.toastController.create({
        message: texto,
        duration: 2000
      });
      toast.present();
    }

    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Aguarde...',
        //duration: 2000
      });
      await loading.present();  
      // const { role, data } = await loading.onDidDismiss();
      // console.log('Loading dismissed!');
    }

    async dismissLoading(){
      await this.loadingController.dismiss();
    }
}
