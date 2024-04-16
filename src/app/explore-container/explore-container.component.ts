import { Component, Input } from '@angular/core';
import { LoginDTO, RegisterDTO } from '../models/authentication';
import { JwtAuth } from '../models/jwtAuth';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  loginDto: LoginDTO = {
    email: '',
    password: ''
  };
  registerDto: RegisterDTO = {
    name: '',
    email: '',
    password: ''
  };
  jwtDto!: JwtAuth;

  constructor(private authService: AuthenticationService){

  }

  register(registerDto: RegisterDTO){
    this.authService.register(registerDto).subscribe();
  }

  login(loginDto: LoginDTO){
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
    });
  }
}
