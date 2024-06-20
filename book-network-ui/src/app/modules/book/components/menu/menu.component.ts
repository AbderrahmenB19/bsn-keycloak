import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { Router } from '@angular/router';
import { KeycloakService } from '../../../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any,
    private userService:UserService,
    private router:Router,private keycloakService:KeycloakService
  ) {}
    private _username: any=this.userService.username;
  public get username(): any {
    return this._username;
  }
  
  public set username(value: any) {
    this._username = value;
  }
    
   

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const linkColor = this.document.querySelectorAll('.nav-link');
      linkColor.forEach((link :any ) => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          this.renderer.addClass(link, 'active');
        }
        this.renderer.listen(link, 'click', () => {
          linkColor.forEach((l:any) => {
            this.renderer.removeClass(l, 'active');
          });
          this.renderer.addClass(link, 'active');
        });
      });
    }
  }

  async logout() {
    this.keycloakService.logout()
    
    
  }
}
