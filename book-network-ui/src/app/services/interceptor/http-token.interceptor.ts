import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { KeycloakService } from '../keycloak/keycloak.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService)
  const token= keycloakService.keycloak?.token;
  console.log(req.url)
  console.log(token)
 
   
  if(token){
    const authReq = req.clone({
      headers : new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    })
    return next(authReq)
  }
  return next(req);
};
