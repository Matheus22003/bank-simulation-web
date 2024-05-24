import {Routes} from '@angular/router';
import {LoginComponent} from "./core/features/login/login.component";
import {RegistrarComponent} from "./core/features/registrar/registrar.component";
import {HomeComponent} from "./core/features/home/home.component";
import {authGuard} from "./core/Guards/auth.guard";
import {CadastroClienteComponent} from "./core/features/clientes/cadastro-cliente/cadastro-cliente.component";
import {EditarClienteComponent} from "./core/features/clientes/editar-cliente/editar-cliente.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'cliente/cadastro', component: CadastroClienteComponent, canActivate: [authGuard]},
  {path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [authGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'},

];
