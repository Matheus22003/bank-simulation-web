import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ClienteService} from "../../../services/cliente.service";
import {ClienteModel} from "../../../models/cliente.model";

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent {
  public contaBancariaForm = this.formBuilder.group({
    agencia: ['', Validators.required],
    numero: ['', Validators.required]
  });

  public cadastroClienteForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    contaBancaria: this.contaBancariaForm
  });


  constructor(private formBuilder: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router,
              private toastr: ToastrService,
              private clienteService: ClienteService) {
  }

  public onSubmit(): void {
    const usuarioCadastro = this.cadastroClienteForm.value as unknown as ClienteModel;
    this.clienteService.cadastrar(usuarioCadastro).subscribe({
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

  public limparForm(): void {
    this.cadastroClienteForm.reset();
  }
}
