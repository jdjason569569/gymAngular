import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from './precios/precios.component';

const routes: Routes = [
  {
    path: 'listado-clientes', component : ListadoClientesComponent
  },
  {
    path: 'crear-cliente', component : AgregarClienteComponent
  },
  {
    path: 'crear-cliente/:clienteId', component : AgregarClienteComponent
  },
  {
    path: 'precios', component :PreciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
