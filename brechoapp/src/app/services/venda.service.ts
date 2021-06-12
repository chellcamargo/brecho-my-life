import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Venda } from '../models/venda';






@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(
    private firedb:AngularFirestore
  ) { }


  add(venda:Venda){
    return this.firedb.collection<Venda>("venda").add(
     { 
        key: venda.key,
        Localização: venda.Localização,
        Valor: venda.Valor,
        Produto: venda.Produto,        
      }
    )
  }

  getAll(){
    //return this.firedb.collection<User>("deposito").valueChanges()
    return this.firedb.collection<VendaService>("venda").snapshotChanges()
    .pipe(
      map(dados =>
        dados.map(
          d => ({
            key: d.payload.doc.id, ...d.payload.doc.data()
          })
        )
      )
    )
  }

  get(key){
    return this.firedb.collection<Venda>("venda").doc(key).valueChanges();
  }

  update(venda:Venda, key:string){
    return this.firedb.collection<Venda>("venda").doc(key).update(venda);
  }

  delete(key){
    return this.firedb.collection("venda").doc(key).delete();
  }
}
