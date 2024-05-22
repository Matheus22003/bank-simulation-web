import {Component, Input} from '@angular/core';
import {NgxMaskDirective} from "ngx-mask";
import {FormsModule} from "@angular/forms";
import {TransacaoService} from "../../../services/transacao.service";
import {TransacaoModel} from "../../../models/transacao.model";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-transacao',
  standalone: true,
  imports: [
    NgxMaskDirective,
    FormsModule
  ],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent {

}
