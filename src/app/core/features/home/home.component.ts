import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CurrencyPipe} from "../../pipes/currency.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClienteService} from "../../services/cliente.service";
import {ClienteModel} from "../../models/cliente.model";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  providers: [BsModalService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public clientes: ClienteModel[] = [];
  public clienteSelected?: ClienteModel;
  public modalRef?: BsModalRef;


  constructor(private clienteService: ClienteService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService) {
  }

  public ngOnInit(): void {
    this.loadTabela();
  }

  public loadTabela() {
    this.clientes = [];
    this.clienteService.getClientes().subscribe({
      next: (response) => {
        this.clientes = response;
      },
      error: () => {
        this.router.navigate(['/login']);
        this.toastr.error("Erro ao buscar perfil", 'Erro!!!');
      }
    });
  }


  public navigateCadastroCliente(): void {
    this.router.navigate(['/cliente/cadastro']);
  }

  public confirmDelete() {
    if (this.clienteSelected?.id != null) {
      this.clienteService.deleteCliente(this.clienteSelected.id).subscribe({
        next: () => {
          this.toastr.success("Cliente deletado com sucesso", 'Sucesso!!!');
          this.exitModal();
          this.loadTabela();
        },
        error: () => {
          this.toastr.error("Erro ao deletar cliente", 'Erro!!!');
        }
      });
      return
    }
    debugger
    this.toastr.error("Erro ao deletar id do cliente", 'Erro!!!');
  }

  public openModalDelete(template: TemplateRef<any>, cliente: ClienteModel) {
    this.clienteSelected = cliente;
    this.modalRef = this.modalService.show(template);
  }

  exitModal = (): void => {
    this.modalRef?.hide();
  };
}
