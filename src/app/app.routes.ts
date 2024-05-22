import {Routes} from '@angular/router';
import {LoginComponent} from "./core/features/login/login.component";
import {RegistrarComponent} from "./core/features/registrar/registrar.component";
import {HomeComponent} from "./core/features/home/home.component";
import {authGuard} from "./core/Guards/auth.guard";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},

];
