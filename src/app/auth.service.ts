import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class AuthService {

  constructor(public dataService: DataService) {}

  login(user){

    return this.dataService.editRecord("session", user).map(
      result => {
        localStorage.setItem("auth_user", JSON.stringify(result));
      }
    )

  }

  logout(){

    return this.dataService.deleteRecord("session").map(
      result => {
        localStorage.removeItem("auth_user");
      }
    )

  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_user");
  }
}
