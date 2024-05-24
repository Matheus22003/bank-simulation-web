import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AuthModel} from "../models/auth.model";
import {UsuarioModel} from "../models/usuario.model";
import {TransacaoDaoModel} from "../models/transacaoDao.model";
import {AuthService} from "./auth.service";
import {ClienteModel} from "../models/cliente.model";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/v1';

  public valorTotalExtrato = new BehaviorSubject<number>(0);
  public valorTotalExtrato$ = this.valorTotalExtrato.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public cadastrar(clienteModel: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(`${this.apiUrl}/clientes`, clienteModel);
  }

  public atualizar(clienteModel: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.apiUrl}/clientes`, clienteModel);
  }

  public getClientes(): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>(`${this.apiUrl}/clientes`);

  }

  public deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clientes/${id}`);

  }

  public getClientesById(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.apiUrl}/clientes/${id}`);

  }

}
