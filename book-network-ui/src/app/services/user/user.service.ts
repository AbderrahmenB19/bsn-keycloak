import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private _username: any;
  public get username(): String {
    return this._username;
  }
  public set username(value: String) {
    this._username = value;
  }

}
