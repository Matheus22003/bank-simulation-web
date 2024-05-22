import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TransacaoModel} from "../../models/transacao.model";
import {CurrencyPipe} from "../../pipes/currency.pipe";
import {TransacaoComponent} from "./transacao/transacao.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TransacaoService} from "../../services/transacao.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    TransacaoComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public extratos: TransacaoModel[] = [];
  public valorAdicionado!: string;

  public valorTotalConta: number = 0;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private transacaoService: TransacaoService) {
  }

  public ngOnInit(): void {
    this.loadTabela();
  }

  public loadTabela() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.extratos = response.contaBancaria.transacaos
        this.extratos.forEach(value => this.valorTotalConta = this.valorTotalConta + value.valor);
      },
      error: () => {
        this.router.navigate(['/login']);
        this.toastr.error("Erro ao buscar perfil", 'Erro!!!');
      }
    });
  }


  public adicionarValor(): void {
    if (!!this.valorAdicionado) {
      this.transacaoService.cadastrar(Number.parseFloat(this.valorAdicionado)).subscribe(value => {
        this.valorAdicionado = '';
        this.loadTabela();
      });
    }
  }

}
