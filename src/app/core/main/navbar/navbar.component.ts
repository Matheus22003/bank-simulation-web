import {Component, Input, OnInit} from '@angular/core';
import {UsuarioModel} from "../../models/usuario.model";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {CurrencyPipe} from "../../pipes/currency.pipe";
import {ClienteService} from "../../services/cliente.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public currentRoute: string = '';

  public currentValue = 0;

  constructor(private router: Router,
              private clienteService: ClienteService,
              private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.currentRoute = this.router.url;
      }
    });
  }

  public ngOnInit(): void {
    this.clienteService.valorTotalExtrato$.subscribe(value => {
      this.currentValue = value;
    });
  }

  public isLoginOrRegistrar(): boolean {
    return this.currentRoute === '/login' || this.currentRoute === '/registrar';
  }

  public logout(): void {
    this.authService.logout();
  }

}
