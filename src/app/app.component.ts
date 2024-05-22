import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {setTheme} from "ngx-bootstrap/utils";
import {NavbarComponent} from "./core/main/navbar/navbar.component";
import {AuthService} from "./core/services/auth.service";
import {UsuarioModel} from "./core/models/usuario.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {
    setTheme('bs5');
  }


}
