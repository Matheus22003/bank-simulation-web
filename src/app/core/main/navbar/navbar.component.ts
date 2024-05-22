import {Component, Input, OnInit} from '@angular/core';
import {UsuarioModel} from "../../models/usuario.model";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor() {
  }

}
