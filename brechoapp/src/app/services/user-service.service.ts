import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  constructor(
    private http: HttpClient,
    private firedb:AngularFirestore,
    private auth : AngularFireAuth
  ) { }

  pegaCEP(cep: string) {
    var local: string = "https://viacep.com.br/ws/" + cep + "/json";
    return this.http.get<User>(local);
  }

  add(usuario:User){
    return this.auth.createUserWithEmailAndPassword(usuario.email,usuario.senha).then(

      (res) => {

    return this.firedb.collection<User>("usuarios").doc(res.user.uid).set({
      
        nome : usuario.nome,
        email: usuario.email,
        senha: null,
      });
     },
    )
      erro=>}
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
