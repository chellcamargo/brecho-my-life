import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private firedb:AngularFirestore
  ) { }


  add(categoria:Categoria){
    return this.firedb.collection<Categoria>("categoria").add(
     { 
      categoriakey : categoria.categoriakey,
      nome : categoria.nome, 
        
        
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
    return this.firedb.collection<Categoria>("categoria").doc(key).valueChanges();
  }

  update(categoria:Categoria, key:string){
    return this.firedb.collection<Categoria>("categoria").doc(key).update(categoria);
  }

  delete(key){
    return this.firedb.collection("categoria").doc(key).delete();
  }
}
