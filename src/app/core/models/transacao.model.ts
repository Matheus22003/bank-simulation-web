export class TransacaoModel {
  id: number;
  valor: number;
  tipoTransacao: string;
  descricao: string;

  constructor(id: number, valor: number, tipoTransacao: string, descricao: string) {
    this.id = id;
    this.valor = valor;
    this.tipoTransacao = tipoTransacao;
    this.descricao = descricao;
  }
}
