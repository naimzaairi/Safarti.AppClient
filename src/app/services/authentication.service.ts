import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseDTO, LoginDTO, LoginResponseDTO, RegisterDTO } from '../models/authentication';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { UserDTO } from '../models/user';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private registerApiEndpoint: string = environment.apiUrl + "/Auth/register";
  private loginApiEndpoint: string = environment.apiUrl + "/Auth/login";

  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private userDTO?: UserDTO;
  //private profileDTO?: ProfileDTO;
  private isAuthorized: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { 
    this.isAuthenticated$.next(this.isAuthorized);
  }

  public register(user: RegisterDTO): Promise<AuthResponseDTO>{
    return lastValueFrom(this.httpClient.post<AuthResponseDTO>(this.registerApiEndpoint, user));
  }

  public initAuth(): void {
    var token = this.getToken();
    if(token) {
      let isTokenExpired = this.isTokenExpired();

      if(!isTokenExpired){
        console.log("Token not expired");
        this.isAuthorized = true;
        this.isAuthenticated$.next(this.isAuthorized);

        //redirect to home page
        this.router.navigate(['/','home']);

      } else {
        console.log("Token expired");
        this.isAuthorized = false;
        this.isAuthenticated$.next(this.isAuthorized);

        //redirec to login page
        this.router.navigate(['/','welcome']);

      }
    }
    else {
      console.log("No token");
        this.isAuthorized = false;
        this.isAuthenticated$.next(this.isAuthorized);

        //redirec to login page
        this.router.navigate(['/','welcome']);
    }
  }

  public login(user: LoginDTO): void{
    this.httpClient.post<LoginResponseDTO>(this.loginApiEndpoint, user).subscribe(
      {
        next: (response: LoginResponseDTO) => {
          console.log(response);
          localStorage.setItem('safartiToken', response.token);

          if(response.userDTO){
            this.userDTO = response.userDTO;
            this.isAuthorized = true;
            this.isAuthenticated$.next(this.isAuthorized);

            this.router.navigate(['/','home']);
            if(this.userDTO.profileId){
              //call getProfile
              //redirect home page
              this.router.navigate(['/','home']);
            } 
            else {
              //redirect create profile
            }

          }
        },
        error: (error: LoginResponseDTO) => {
          console.log(error);
          this.isAuthorized = false;
          this.isAuthenticated$.next(this.isAuthorized);

          //remove token
          //navigate to login page
          this.router.navigate(['/','welcome']);
        }
      }
    );
  }

  public logout(): void {
    localStorage.removeItem("safartiToken");
  }

  public getToken(): any {
    return localStorage.getItem("safartiToken");
  }

  public decodeToken(): any {
    const token = this.getToken();
    if(token)
      return jwt_decode.jwtDecode(token);
  }

  public isUserloggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public isTokenExpired(): boolean {
    let token = this.getToken();
    if(!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if(date == undefined){
      return true;
    }
    
    if(date?.valueOf() > new Date().valueOf()){
      return false;
    }

    return true;
  }

  private getTokenExpirationDate(token: string): Date | null {
    const tokenDecoded = jwt_decode.jwtDecode(token);

    if(tokenDecoded.exp === undefined){
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(tokenDecoded.exp);
    return date;
  }

  // private getLoggedInUser(): Observable<LoginResponseDTO> {
  //   return this.httpClient.get()
  // }

}
