import {TransacaoModel} from "./transacao.model";

export class ContaBancariaModel {
  agencia: string;
  numero: string;
  transacaos: TransacaoModel[];

  constructor(agencia: string, transacaos: [], numero: string) {
    this.agencia = agencia;
    this.numero = numero;
    this.transacaos = transacaos;
  }
}
