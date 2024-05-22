export class TransacaoModel {
  valor: number;
  tipoTransacao: string;
  descricao: string;

  constructor(valor: number, tipoTransacao: string, descricao: string) {
    this.valor = valor;
    this.tipoTransacao = tipoTransacao;
    this.descricao = descricao;
  }
}
