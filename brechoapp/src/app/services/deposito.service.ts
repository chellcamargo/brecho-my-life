import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Deposito } from '../models/deposito';



@Injectable({
  providedIn: 'root'
})
export class DepositoService {

  constructor(
    private firedb:AngularFirestore
  ) { }


  add(deposito:Deposito){
    return this.firedb.collection<Deposito>("deposito").add(
     { 
      key: deposito.key,
      nome: deposito.nome, 
        
        
      }
    )
  }

  getAll(){
    //return this.firedb.collection<User>("deposito").valueChanges()
    return this.firedb.collection<DepositoService>("deposito").snapshotChanges()
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
    return this.firedb.collection<Deposito>("deposito").doc(key).valueChanges();
  }

  update(deposito:Deposito, key:string){
    return this.firedb.collection<Deposito>("deposito").doc(key).update(deposito);
  }

  delete(key){
    return this.firedb.collection("deposito").doc(key).delete();
  }
}
