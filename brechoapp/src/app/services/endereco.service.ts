
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Endereco } from "../models/endereco";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private http: HttpClient,
    private firedb:AngularFirestore
  ) { }

  pegaCEP(cep: string) {
    var local: string = "https://viacep.com.br/ws/" + cep + "/json";
    return this.http.get<Endereco>(local);
  }

  add(endereco:Endereco){
    return this.firedb.collection<Endereco>("enderecos").add(
      {
        
        userkey:endereco.userkey,
        bairro : endereco.bairro,
        cep: endereco.cep,
        logradouro : endereco.logradouro,
        localidade: endereco.localidade,
        uf: endereco.uf,
        complemento:endereco.complemento,
        numero: endereco.numero,
        erro: endereco.erro
      }
    )
  }

  getAll(){
    //return this.firedb.collection<User>("enderecos").valueChanges()
    return this.firedb.collection<Endereco>("enderecos").snapshotChanges()
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
    return this.firedb.collection<Endereco>("enderecos").doc(key).valueChanges();
  }

  update(endereco:Endereco, key:string){
    return this.firedb.collection<Endereco>("enderecos").doc(key).update(endereco);
  }

  delete(key){
    return this.firedb.collection("enderecos").doc(key).delete();
  }
}
