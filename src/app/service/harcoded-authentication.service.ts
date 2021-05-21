import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HarcodedAuthenticationService {

  correctUsername='admin'
  correctPwd='admin123'
  constructor() { }


  authenticate(username, password){

    if(username ===  this.correctUsername && password === this.correctPwd) {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    else {
      return false;
    }
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user ===null);

  }
  logout(){
    sessionStorage.removeItem('authenticatedUser');
  }
}
