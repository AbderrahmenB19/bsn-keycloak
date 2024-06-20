import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { inject } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const keycloakService=inject(KeycloakService)
  const router=inject(Router)
  if(keycloakService.keycloak?.isTokenExpired()){
    router.navigate(['login'])
  }
  return true;
};
