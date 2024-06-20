import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isTokenNotValid() {
    return !this.isTokenvalid();
  }
  private _token: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  set token(token: string | null) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token || ''); // Store an empty string if token is null
    }
    this._token = token;
  }

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return this._token;
  }
  isTokenvalid() {
    const token=this._token ;
    if(!token){
      return false;
    }
    const jwtHelper= new JwtHelperService()
    const isExpired=jwtHelper.isTokenExpired(token);
    if(isExpired){
      localStorage.clear()
      return false
    }
    return true;
    
  
  }
  
  
  
}
