import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router:Router,private authService :AuthenticationService, private token:TokenService){}
signup() {
this.router.navigate(["login"])
}
register() {
  this.token.token=""
  this.erorMsg=[];
  this.authService.register({
    body:this.registerRequest
  }).subscribe({
    next:(val)=>{
      console.log(val)
       this.router.navigate(["activate-account"])

    },
    error:(err)=>{
      console.log(err)
      this.erorMsg=err.error.validationErrors ;
    
}})

}
  registerRequest:RegistrationRequest={email:"",firstName:"",lastName:"",password:""}
  erorMsg:string[]=[]

}
