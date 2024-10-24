import { Component, Input, OnInit } from '@angular/core';
import { AuthResponseDTO, LoginDTO, RegisterDTO } from '../models/authentication';
import { AuthenticationService } from '../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit{

  loginDto: LoginDTO = {
    email: '',
    password: ''
  };
  registerDto: RegisterDTO = {
    name: '',
    email: '',
    password: ''
  } ;
  authResponseDto!: AuthResponseDTO;

  constructor(private authService: AuthenticationService, private translate: TranslateService){

  }
  ngOnInit(): void {
    console.log(this.translate.currentLang);
  }

  register(registerDto: RegisterDTO){
    this.authService.register(registerDto)
    .then((response: AuthResponseDTO) => {
      console.log(response);
    })
    .catch();
  }

  login(loginDto: LoginDTO){
    this.authService.login(loginDto);
  }
}
