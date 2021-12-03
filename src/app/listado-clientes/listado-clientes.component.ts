import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = [];

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){
    
    // this.afs.collection('clientes').valueChanges().subscribe((result)=>{
    //   clientes  = result;
    //   console.log('los clientes son ->', clientes);
    // })
    this.clientes.length = 0;
    this.afs.collection('clientes').get().subscribe((result)=>{
      result.docs.forEach((item)=>{
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        this.clientes.push(cliente);
      })
    })
  }

  

}
