export class TransacaoDaoModel {
  valor: number;
  email: string;
  descricao: string;

  constructor(valor: number, email: string, descricao: string) {
    this.valor = valor;
    this.email = email;
    this.descricao = descricao;
  }
}
