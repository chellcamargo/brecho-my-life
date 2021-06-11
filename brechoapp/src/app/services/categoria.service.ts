import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import {categoria} from "../"
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private firedb:AngularFirestore
  ) { }


  add(categoria:Categoria){
    return this.firedb.collection<Categoria>("categoria").add(
      key: categoria.key,
      nome : categoria.nome,
      {
        
        
      }
    )
  }

  getAll(){
    //return this.firedb.collection<User>("categoria").valueChanges()
    return this.firedb.collection<CategoriaService>("categoria").snapshotChanges()
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
    return this.firedb.collection<categoria>("enderecos").doc(key).valueChanges();
  }

  update(endereco:Endereco, key:string){
    return this.firedb.collection<Endereco>("enderecos").doc(key).update(endereco);
  }

  delete(key){
    return this.firedb.collection("enderecos").doc(key).delete();
  }
}
