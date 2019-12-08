import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  create_NewStudent(record) {
    return this.firestore.collection('Donor').add(record);
  }
  create_NewDoctor(record){
    return this.firestore.collection('Doctor').add(record);
  }
  read_Students() {
    return this.firestore.collection('Doctor').snapshotChanges();
  }
 
  update_Student(recordID,record){
    this.firestore.doc('Donor/' + recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('DOnor/' + record_id).delete();
  }
}
 