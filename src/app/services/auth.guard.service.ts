import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


export const AuthGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isAuthenticated$){
    console.log("Access granted");

    return true;
  }
  else {
    console.log('NOT AUTHORIZED');

    router.navigate(['/', 'welcome']);
  }

  return false;
}
