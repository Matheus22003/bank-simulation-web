import {ContaBancariaModel} from "./contaBancaria.model";

export class ClienteModel {
  public id: number;
  public nome: string;
  public email: string;
  public dataNascimento: Date;
  public contaBancaria: ContaBancariaModel;

  
  constructor(id: number, nome: string, email: string, dataNascimento: Date, contaBancaria: ContaBancariaModel) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.contaBancaria = contaBancaria;
  }


}
