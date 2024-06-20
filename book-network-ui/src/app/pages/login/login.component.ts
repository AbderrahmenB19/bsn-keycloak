import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';
import { UserService } from '../../services/user/user.service';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor( private keycloakservice:KeycloakService
  ){}
  async ngOnInit():Promise<void> {
    await this.keycloakservice.init();
    await this.keycloakservice.login()
  }
/* register() {
  this.router.navigate(['register'])

}
login() {
  this.tokenService.token="" ;
  this.erorMessages=[];
  this.authService.authenticate({
    body:this.authRequest
  }).subscribe({
    next:(res)=>{
      let token :any=jwtDecode(res.token as string )
      this.userservice.username=token.fullname 
     
      this.tokenService.token=res.token as string 
      this.router.navigate(["books"])
    },
    error:(err):void=>{
      console.log(err)
      if(err.error.validationErrors){
        this.erorMessages=err.error.validationErrors;

      }else{
        this.erorMessages.push(err.error.error)
      }
    }
  })
}
  
  
  
  authRequest:AuthenticationRequest={email:"",password:""}
  erorMessages:Array<string>=[]

} */
}
