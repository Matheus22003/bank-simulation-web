import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private readonly viacepUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {
  }

  public buscarCep(cep: string): Observable<any> {
    return this.http.get<any>(`${this.viacepUrl}/${cep}/json`);
  }
}
