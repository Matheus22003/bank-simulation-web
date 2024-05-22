import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {passwordsMatchValidator} from "../../validators/password.validator";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(protected readonly authService: AuthService,
              private readonly formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.authService.logout();
  }

  public login(): void {
    this.authService.login(this.loginForm.get("email")?.value || "", this.loginForm.get("password")?.value || "").subscribe({
      next: value => {
        this.router.navigate(["/home"]);
        this.toastr.success("Logado com sucesso!!!", 'Sucesso!!!');
      }, error: () => {
        this.toastr.error("Usuário ou senha inválidos", 'Erro!!!');
      }
    });
  }


}
