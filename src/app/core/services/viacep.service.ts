import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnderecoModel} from "../models/endereco.model";

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private readonly viacepUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {
  }

  public buscarCep(cep: string): Observable<EnderecoModel> {
    return this.http.get<any>(`${this.viacepUrl}/${cep}/json`);
  }
}
