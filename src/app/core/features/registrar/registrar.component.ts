import {Component} from '@angular/core';
import {EnderecoComponent} from "./endereco/endereco.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {passwordsMatchValidator} from "../../validators/password.validator";
import {UsuarioModel} from "../../models/usuario.model";
import {EnderecoModel} from "../../models/endereco.model";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    EnderecoComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {

  public enderecoForm = this.formBuilder.group({
    cep: ['', Validators.required],
    rua: ['', Validators.required],
    numero: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    estado: ['', Validators.required],
    complemento: [''],
  });

  public cadastroForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    endereco: this.enderecoForm,
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {validators: passwordsMatchValidator()});

  constructor(private formBuilder: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router,
              private toastr: ToastrService) {
  }

  public onSubmit(): void {
    const usuarioCadastro = this.cadastroForm.value as UsuarioModel;

    this.authService.cadastrar(usuarioCadastro).subscribe({
      next: () => {
        this.router.navigate(['/login'], {queryParams: {email: usuarioCadastro.email}});
      },
      error: httpError => {
        this.toastr.error(httpError.error.message, 'Erro')
      }
    });
  }

  public getIsValidInput(campo: string): false | boolean | undefined {
    return !this.cadastroForm.get(campo)?.valid && this.cadastroForm.get(campo)?.dirty;
  }

  public getIsValidPassword(): false | boolean | undefined {
    return this.getIsValidInput(`password`) || !!this.cadastroForm.errors?.['passwordsMismatch'];
  }
}
