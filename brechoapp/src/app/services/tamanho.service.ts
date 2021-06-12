import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Tamanho } from '../models/tamanho';





@Injectable({
  providedIn: 'root'
})
export class TamanhoService {

  constructor(
    private firedb:AngularFirestore
  ) { }


  add(tamanho:Tamanho){
    return this.firedb.collection<Tamanho>("tamanho").add(
     { 
      key: tamanho.key,
      nome: tamanho.nome, 
        
        
      }
    )
  }

  getAll(){
    //return this.firedb.collection<User>("deposito").valueChanges()
    return this.firedb.collection<TamanhoService>("tamanho").snapshotChanges()
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
    return this.firedb.collection<Tamanho>("tamanho").doc(key).valueChanges();
  }

  update(tamanho:Tamanho, key:string){
    return this.firedb.collection<Tamanho>("tamanho").doc(key).update(tamanho);
  }

  delete(key){
    return this.firedb.collection("tamanho").doc(key).delete();
  }
}
