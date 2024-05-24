import {Component, OnInit, signal, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgIf, TitleCasePipe} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ClienteService} from "../../../services/cliente.service";
import {ClienteModel} from "../../../models/cliente.model";
import {TransacaoModel} from "../../../models/transacao.model";
import {CurrencyPipe} from "../../../pipes/currency.pipe";
import {TipoTransacaoEnum} from "../../../models/enums/tipoTransacao.enum";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TransacaoModalComponent} from "./transacao-modal/transacao-modal.component";
import {TransacaoService} from "../../../services/transacao.service";

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    CurrencyPipe,
    TitleCasePipe
  ],
  providers: [BsModalService],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {
  public contaBancariaForm = this.formBuilder.group({
    agencia: ['', Validators.required],
    numero: ['', Validators.required]
  });

  public cadastroClienteForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: new FormControl({value: '', disabled: true}, Validators.required),
    dataNascimento: ['', Validators.required],
    contaBancaria: this.contaBancariaForm
  });

  public modalRef?: BsModalRef;


  private readonly datePipe: DatePipe = new DatePipe('en-US');

  public extrato: TransacaoModel[] = [];
  public transacaoSelected?: TransacaoModel;

  public id: number = 0;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly modalService: BsModalService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly toastr: ToastrService,
              private readonly clienteService: ClienteService,
              private readonly transacaoService: TransacaoService,
  ) {
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.loadCliente()
    });

  }

  private loadCliente(): void {
    this.clienteService.getClientesById(this.id).subscribe({
      next: cliente => {
        let valorTotal = 0;
        this.extrato = cliente.contaBancaria.transacaos || [];
        this.extrato.forEach(tranascao => valorTotal += tranascao.valor)
        this.clienteService.valorTotalExtrato.next(valorTotal);
        this.cadastroClienteForm.patchValue({
          nome: cliente.nome,
          email: cliente.email,
          dataNascimento: this.datePipe.transform(cliente.dataNascimento, 'yyyy-MM-dd'),
          contaBancaria: {
            agencia: cliente.contaBancaria.agencia,
            numero: cliente.contaBancaria.numero
          }
        });
      },
      error: httpError => {
        this.toastr.error(httpError.error.message, 'Erro');
      }
    });
  }

  public onSubmit(): void {
    const usuarioCadastro = this.cadastroClienteForm.value as unknown as ClienteModel;
    usuarioCadastro.email = this.cadastroClienteForm.get('email')?.value || '';
    this.clienteService.atualizar(usuarioCadastro).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.toastr.info('Cadastro realizado com sucesso!', 'Sucesso');
      },
      error: httpError => {
        this.toastr.error(httpError.error.message, 'Erro')
      }
    });
  }

  public getIsValidInput(campo: string): false | boolean | undefined {
    return !this.cadastroClienteForm.get(campo)?.valid && this.cadastroClienteForm.get(campo)?.dirty;
  }

  public getTipoTransacao(transacao: string): string {
    const tipo = TipoTransacaoEnum[transacao as keyof typeof TipoTransacaoEnum];
    return tipo ? tipo : 'Tipo de Transação Inválido';
  }

  public deletarTransacao(): void {
    if (this.transacaoSelected === undefined) return;
    this.transacaoService.deletarTransacao(this.transacaoSelected.id).subscribe({
      next: () => {
        this.toastr.info('Transação deletada com sucesso!', 'Sucesso');
        this.loadCliente();
        this.modalRef?.hide();
      },
      error: () => {
        this.toastr.error("Erro ao deletar a transação!", 'Erro');
      }
    });
  }

  public openModalTransacaoDelete(template: TemplateRef<any>, transacao: TransacaoModel) {
    this.transacaoSelected = transacao;
    this.modalRef = this.modalService.show(template);
    this.modalRef.onHidden?.subscribe(() => {
      this.loadCliente();
    });
  }

  public openModalTransacaoCadastro() {
    this.modalRef = this.modalService.show(TransacaoModalComponent, {initialState: {email: this.cadastroClienteForm.get('email')?.value || ''}});
    this.modalRef.onHidden?.subscribe(() => {
      this.loadCliente();
    });
  }

  public exitModal(): void {
    this.modalRef?.hide();
  };

}
