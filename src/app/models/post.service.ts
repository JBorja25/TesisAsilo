import { Injectable } from '@angular/core';
//importar modulo de db de firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';


//importar modulo nuestro
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore:AngularFirestore) {}

  //metodos para el crud
  /* getPosts(){
    return this.angularFirestore.collection("post")
                .snapshotChanges()
  } */
  updateModificarRechazar(modificar: boolean, idDoc: string, nomostrarImagen: boolean){

    return this.angularFirestore.collection('post').doc(idDoc).update({
      mostrarRegistroAsilo:modificar,
      nomostrarImagen
    });
  }

  getPostByUid(uid: any){
    return this.angularFirestore.collection('post', ref => ref.where('uid', '==', uid)).get();
  }
  getPostId(){
    return this.angularFirestore.collection("post")
                .get();
  }
  getPostsById(id){
    return this.angularFirestore.collection("post")
                .doc(id)
                .valueChanges()
  }
  createPosts(post: any){
      // return new Promise<any>((resolve, reject)=>{
        return this.angularFirestore.collection("post").add(post);
      // })
  }
  updatePost(post: any, idDoc: string){
      // return new Promise<any>((resolve, reject)=>{
        return this.angularFirestore.collection("post").doc(idDoc).update(post);
      // })
  }
  updatePostAfterRechazo(post: any, idDoc: string){
      // return new Promise<any>((resolve, reject)=>{
        return this.angularFirestore.collection("post").doc(idDoc).update(post);
      // })
  }
  updatePosts(post:Post, id){
    return this.angularFirestore.collection("post")
    .doc(id)
    .update({
      address:post.address,
      email:post.email,
      fono:post.fono,
      name:post.name,

      
    });

  }
  deletePosts(post){
    return this.angularFirestore
    .collection("post")
    .doc(post.idDoc)
    .delete();
  }


  actualizarAprobacion(aprobado: boolean, confirmacion: boolean, cuentaVerificada: boolean, idDoc: string, rechazar: boolean){
    return this.angularFirestore.collection('post').doc(idDoc).update({
      aprobado,
      confirmacion,
      cuentaVerificada,
      rechazar
    });
  }
  actualizarRechazados(aprobado: boolean, confirmacion: boolean, cuentaVerificada: boolean, rechazar: boolean, idDoc: string, mensaje: string, nomostrarImagen: boolean, correcciones: boolean){
    return this.angularFirestore.collection('post').doc(idDoc).update({
      aprobado,
      confirmacion,
      cuentaVerificada,
      rechazar,
      mensaje,
      nomostrarImagen,
      correcciones
    });


  }


  
  
}
