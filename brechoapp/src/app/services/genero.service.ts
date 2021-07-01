import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Genero } from '../models/genero';




@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(
    private firedb:AngularFirestore
  ) { }


  add(genero:Genero){
    return this.firedb.collection<Genero>("genero").add(
     { 
      generokey: genero.generokey,
      nome: genero.nome, 
        
        
      }
    )
  }

  getAll(){
    //return this.firedb.collection<User>("deposito").valueChanges()
    return this.firedb.collection<GeneroService>("genero").snapshotChanges()
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
    return this.firedb.collection<Genero>("genero").doc(key).valueChanges();
  }

  update(genero:Genero, key:string){
    return this.firedb.collection<Genero>("genero").doc(key).update(genero);
  }

  delete(key){
    return this.firedb.collection("genero").doc(key).delete();
  }
}
