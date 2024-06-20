import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../services/services';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private userSerice:UserService){}
  username: string=this.userSerice.username as string ;
 
}
