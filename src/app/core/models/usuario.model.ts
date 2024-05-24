import {ContaBancariaModel} from "./contaBancaria.model";

export class UsuarioModel {
  nome: string;
  email: string;
  dataNascimento: string;
  password: string;
  confirmPassword: string;
  contaBancaria: ContaBancariaModel;

  constructor(nome: string, email: string, dataNascimento: string, password: string, confirmPassword: string, contaBancaria: ContaBancariaModel) {
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.contaBancaria = contaBancaria;
  }
}
