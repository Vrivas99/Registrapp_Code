import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  createDoc(data:any,path:string,id:string){
    const collection = this.afs.collection(path);
    return collection.doc(id).set(data);
  }
  createID(){
    return this.afs.createId();
  }
  
  getCollection<tipo>(path:string){
    const collection = this.afs.collection<tipo>(path);
    return collection.valueChanges();
  }

  updateDco(data:any,path:string,id:string){
    const docu = this.afs.collection(path);
    return docu.doc(id).update(data);
  }

  deleteDoc(path: string, id: string){
    const docu = this.afs.collection(path);
    return docu.doc(id).delete();
  }
  
  /*   getCollection(){
    console.log('recuperando firebase...');
    this.afs.collection('Asistencias').valueChanges().subscribe((res)=>{
        console.log('res ->',res);
    });
  } */
}
