import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formClient! : FormGroup;
  porcentajeSubida : number = 0;
  urlImagen : string = '';
  esEditable: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private storage: AngularFireStorage, 
    private afs: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private mensajesService:MensajesService, 
    private router:Router) { }
    private id!: string;

  ngOnInit(): void {

    this.formClient = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      cedula: [''],
      //fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    })

    this.id = this.activeRoute.snapshot.params.clienteId;
    if(this.id != undefined){
      this.esEditable = true;
      this.afs.doc<any>('clientes'+'/'+this.id).valueChanges().subscribe((cliente)=>{
        this.formClient.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          //fechaNacimiento: cliente.fechaNacimiento,
          telefono: cliente.telefono,
          cedula: cliente.cedula,
          imgUrl: ''
        })
      this.urlImagen = cliente.imgUrl;
      })

    }
  }

  agregar(){
    this.formClient.value.imgUrl = this.urlImagen;
    //this.formClient.value.fechaNacimiento = new Date(this.formClient.value.fechaNacimiento);
    this.afs.collection('clientes').add(this.formClient.value).then((end)=>{
      this.mensajesService.mensajeOk('Agregar', 'Se agrego correctamente');
      this.router.navigate(['/listado-clientes']);
    }).catch((error)=>{
      this.mensajesService.mensajeError('Error', error); 
    })
  }

  editar(){
    this.formClient.value.imgUrl = this.urlImagen;
    //this.formClient.value.fechaNacimiento = new Date(this.formClient.value.fechaNacimiento);
    this.afs.doc('clientes/'+ this.id).update(this.formClient.value).then(()=>{
      this.mensajesService.mensajeOk('Editar', 'Se edito correctamente')
      this.router.navigate(['/listado-clientes']);
    }).catch((error)=>{
      this.mensajesService.mensajeError('Error', error); 
    })
  }

  uploadFile(event: any) {
    if(event.target.files.length > 0){
      let nombre = new Date().getTime().toString();
      const file = event.target.files[0];
      let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      const filePath = 'clientes/'+nombre+extension;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.then((result)=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url;
        })
      })
      task.percentageChanges().subscribe((result: any) =>{
        this.porcentajeSubida = parseInt(result);
      })
    }
    }
}
