import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import Keycloak from 'keycloak-js';
import { userProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: userProfile | undefined;
  public get profile(): userProfile | undefined {
    return this._profile;
  }
  public set profile(value: userProfile | undefined) {
    this._profile = value;
  }
  public get keycloak(): Keycloak | undefined {
    if (!this._keycloak && isPlatformBrowser(this.platformId)) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8088',
        realm: 'BSN',
        clientId: 'bsn'
      });
    }
    return this._keycloak;
  }
  public set keycloak(value: Keycloak | undefined) {
    this._keycloak = value;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async init() {
    if (isPlatformBrowser(this.platformId)) {
      console.log("Authenticating the user...");
      const authenticated = await this.keycloak?.init({
        onLoad: 'login-required'
      });
      if (authenticated) {
        this._profile=(await this.keycloak?.loadUserProfile()) as userProfile
        this._profile.token=this._keycloak?.token;
      }

 }
  }
  login(){
    return this.keycloak?.login();

  }
  logout(){
    return this._keycloak?.logout()
  }
}

