import {EnderecoModel} from "./endereco.model";
import {ContaBancariaModel} from "./contaBancaria.model";

export class UsuarioModel {
  nome: string;
  email: string;
  dataNascimento: string;
  password: string;
  confirmPassword: string;
  endereco: EnderecoModel;
  contaBancaria: ContaBancariaModel;

  constructor(nome: string, email: string, dataNascimento: string, password: string, confirmPassword: string, endereco: EnderecoModel, contaBancaria: ContaBancariaModel) {
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.endereco = endereco;
    this.contaBancaria = contaBancaria;
  }
}
