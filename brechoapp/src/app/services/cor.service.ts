import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Cor } from '../models/cor';


@Injectable({
  providedIn: 'root'
})
export class CorService {

  constructor(
    private firedb:AngularFirestore
  ) { }


  add(cor:Cor){
    return this.firedb.collection<Cor>("cor").add(
     { 
      corkey: cor.corkey,
      nome: cor.nome, 
        
        
      }
    )
  }

  getAll(){
    //return this.firedb.collection<User>("categoria").valueChanges()
    return this.firedb.collection<CorService>("cor").snapshotChanges()
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
    return this.firedb.collection<Cor>("cor").doc(key).valueChanges();
  }

  update(cor:Cor, key:string){
    return this.firedb.collection<Cor>("cor").doc(key).update(cor);
  }

  delete(key){
    return this.firedb.collection("cor").doc(key).delete();
  }
}
