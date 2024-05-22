import {Component, Input, OnInit} from '@angular/core';
import {NgxMaskDirective} from "ngx-mask";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ViacepService} from "../../../services/viacep.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [
    NgxMaskDirective,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent implements OnInit {
  @Input() formGroup!: FormGroup;


  constructor(private readonly viaCepService: ViacepService) {
  }

  public ngOnInit(): void {

    this.formGroup.get('cep')?.valueChanges.subscribe((cep) => {
      if (cep.length === 8) {
        this.viaCepService.buscarCep(cep).subscribe((endereco) => {
          this.formGroup.patchValue({
            rua: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf,
          });
        });
      }
    });

  }

  public getIsValidInput(campo: string): false | boolean | undefined {
    return !this.formGroup.get(campo)?.valid && this.formGroup.get(campo)?.dirty;
  }


}
