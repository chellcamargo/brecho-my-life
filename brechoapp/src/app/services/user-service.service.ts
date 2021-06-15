import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  constructor(
    private http: HttpClient,
    private firedb:AngularFirestore
  ) { }

    add(usuario:User){
    return this.firedb.collection<User>("serviço").add(
      {
        userkey: usuario.userkey,
        nome: usuario.nome,
        telefone: usuario.telefone,
        cpf: usuario.cpf,
        email: usuario.email,
        ativo: usuario.ativo,

      }
    )
  }

  getAll(){
    //return this.firedb.collection<User>("usuarios").valueChanges()
    return this.firedb.collection<User>("usuarios").snapshotChanges()
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
    return this.firedb.collection<User>("usuarios").doc(key).valueChanges();
  }

  update(user:User, key:string){
    return this.firedb.collection<User>("usuarios").doc(key).update(user);
  }

  delete(key){
    return this.firedb.collection("usuarios").doc(key).delete();
  }
}