import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDTO, RegisterDTO } from '../models/authentication';
import { Observable } from 'rxjs';
import { JwtAuth } from '../models/jwtAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private registerApiEndpoint: string = environment.apiUrl + "/Auth/register";
  private loginApiEndpoint: string = environment.apiUrl + "/Auth/login";

  constructor(private httpClient: HttpClient) { }

  public register(user: RegisterDTO): Observable<JwtAuth>{
    return this.httpClient.post<JwtAuth>(this.registerApiEndpoint, user);
  }

  public login(user: LoginDTO): Observable<JwtAuth>{
    return this.httpClient.post<JwtAuth>(this.loginApiEndpoint, user);
  }

}
