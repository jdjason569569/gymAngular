import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formClient! : FormGroup;
  porcentajeSubida : number = 0;
  urlImagen : string = '';

  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.formClient = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    })
  }

  agregar(){
    this.formClient.value.imgUrl = this.urlImagen;
    this.formClient.value.fechaNacimiento = new Date(this.formClient.value.fechaNacimiento);
    this.afs.collection('clientes').add(this.formClient.value).then((end)=>{

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
