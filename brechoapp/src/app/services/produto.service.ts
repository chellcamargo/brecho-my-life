import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Produto } from '../models/produto';





@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private firedb:AngularFirestore
  ) { }


  add(produto:Produto){
    return this.firedb.collection<Produto>("produto").add(
      { 
        key: produto.key,
        nome: produto.nome, 
        Descrição: produto.Descrição,
        Valor: produto.Valor,
        Quantidade: produto.Quantidade,
        Peso: produto.Peso,
        Desconto: produto.Desconto,
        imagem: produto.imagem,
        Ativo: produto.Ativo,
        categoria:produto.categoria,
        genero: produto.genero,
        

          
          
        }
      )
    }

  getAll(){
    //return this.firedb.collection<User>("deposito").valueChanges()
    return this.firedb.collection<ProdutoService>("produto").snapshotChanges()
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
    return this.firedb.collection<Produto>("produto").doc(key).valueChanges();
  }

  update(produto:Produto, key:string){
    return this.firedb.collection<Produto>("produto").doc(key).update(produto);
  }

  delete(key){
    return this.firedb.collection("produto").doc(key).delete();
  }
}
