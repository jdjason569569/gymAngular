import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeError(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      confirmButtonText: 'error'
    })
  }
  mensajeOk(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      confirmButtonText: 'success'
    })
  }
  mensajeAdvertencia(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      confirmButtonText: 'warning'
    })
  }
}
