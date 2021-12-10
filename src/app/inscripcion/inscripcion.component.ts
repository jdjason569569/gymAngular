import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../moedels/inscripcion';
import { Cliente } from '../moedels/cliente';
import { DocumentReference } from 'firebase/firestore';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  constructor() { }

  ngOnInit(): void {
  }

  asignarCliente(cliente: Cliente){
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente(){
    this.clienteSeleccionado  = new Cliente();
  }

}
