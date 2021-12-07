import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MensajesService } from '../services/mensajes.service';
import { Precio } from '../moedels/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formPrecio!: FormGroup;
  precios: Precio[] = [];
  esEditar: boolean = false;
  id : string = '';

  constructor(private fb: FormBuilder,
    private afs: AngularFirestore,
    private mensajesService:MensajesService) { }

  ngOnInit(): void {
    this.formPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })
    this.cargarPrecios();
  }  

  cargarPrecios(){
    this.afs.collection('precios').get().subscribe((resultado)=>{
      this.precios.length = 0;
      resultado.docs.forEach((dato: any)=>{
        let precio: Precio = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      })
    })

  }
  agregar(){
    this.afs.collection('precios').add(this.formPrecio.value).then((end)=>{
      this.mensajesService.mensajeOk('Agregar', 'Se agrego correctamente');
      this.cargarPrecios();
    }).catch((error)=>{
      this.mensajesService.mensajeError('Error', error); 
    })

  }

  editar(){
    this.afs.doc('precios/'+ this.id).update(this.formPrecio.value).then(()=>{
      this.mensajesService.mensajeOk('Editado', 'Se edito correctamente')
      this.formPrecio.reset();
      this.esEditar = false;
      this.cargarPrecios();
    }).catch(()=>{
      this.mensajesService.mensajeError('Error', 'Error al editar')
    })
  }


  editarPrecio(precio: Precio){
    this.esEditar = true;
       this.formPrecio.setValue({
         nombre : precio.nombre,
         costo : precio.costo,
         duracion : precio.duracion,
         tipoDuracion : precio.tipoDuracion
       })
       this.id = precio.id;
  }

}
