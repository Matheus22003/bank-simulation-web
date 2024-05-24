import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AuthModel} from "../models/auth.model";
import {UsuarioModel} from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private currentUserSubject: BehaviorSubject<AuthModel>;
  private currentUserInformatiosSubject: BehaviorSubject<UsuarioModel>;
  public currentUser: Observable<AuthModel>;
  public currentUserInformations: Observable<UsuarioModel>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthModel>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUserInformatiosSubject = new BehaviorSubject<UsuarioModel>(JSON.parse(localStorage.getItem('userInfo') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserInformations = this.currentUserInformatiosSubject.asObservable();
  }

  public get currentUserValue(): AuthModel {
    return this.currentUserSubject.value;
  }

  public get currentUserInformationsValue(): UsuarioModel {
    return this.currentUserInformatiosSubject.value;
  }

  public login(email: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${this.apiUrl}/login`, {email, password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        this.getProfile().subscribe();
        return user;
      }));
  }

  public refreshToken(token: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${this.apiUrl}/refreshToken`, {token})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  public cadastrar(usuarioModel: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.apiUrl}/save`, usuarioModel);
  }

  public getProfile(): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUrl}/profile`).pipe(map(value => {
      localStorage.setItem('userInfo', JSON.stringify(value));
      return value;
    }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userInfo');
    this.currentUserSubject.next(Object.create(null));
    this.currentUserInformatiosSubject.next(Object.create(null));
    this.router.navigate(['/login']);
  }

}
