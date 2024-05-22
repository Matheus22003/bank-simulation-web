import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AuthModel} from "../models/auth.model";
import {UsuarioModel} from "../models/usuario.model";
import {TransacaoDaoModel} from "../models/transacaoDao.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public cadastrar(valor: number): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.apiUrl}/transacoes`, {
      valor,
      email: this.authService.currentUserInformationsValue.email
    });
  }

  public getTransacoes(): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUrl}/transacoes`);

  }

}
