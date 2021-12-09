import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../moedels/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.afs.collection<any>('clientes').get().subscribe((result)=>{
      this.clientes.length = 0;
      result.docs.forEach((item)=>{
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.isVisible = false;
        this.clientes.push(cliente);
      })
    })
  }

  buscar(nombre: any){
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.target.value.toLowerCase())){
        cliente.isVisible = true;
      }else{
        cliente.isVisible = false;
      }
    })
  }

}
