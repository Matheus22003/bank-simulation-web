import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {TransacaoService} from "../../../../services/transacao.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ClienteModel} from "../../../../models/cliente.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-transacao-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './transacao-modal.component.html',
  styleUrl: './transacao-modal.component.css'
})
export class TransacaoModalComponent {

  public email: string = '';

  public cadastroClienteForm = this.formBuilder.group({
    valor: ['', Validators.required],
    descricao: [''],
  });

  constructor(public modalRef: BsModalRef,
              private readonly formBuilder: FormBuilder,
              public readonly transacaoService: TransacaoService,
              private readonly toastr: ToastrService,
  ) {
  }

  public onSubmit(): void {
    this.transacaoService.cadastrar(this.email, Number(this.cadastroClienteForm.get("valor")?.value) || 0, this.cadastroClienteForm.get("descricao")?.value || '').subscribe({
      next: () => {
        this.exitModal();
        this.toastr.info('Cadastro realizado com sucesso!', 'Sucesso');
      },
      error: httpError => {
        this.toastr.error(httpError.error.message, 'Erro')
      }
    });
  }

  public exitModal(): void {
    this.modalRef.hide();
  };

  public getIsValidInput(campo: string): false | boolean | undefined {
    return !this.cadastroClienteForm.get(campo)?.valid && this.cadastroClienteForm.get(campo)?.dirty;
  }
}
