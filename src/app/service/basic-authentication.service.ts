import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { API_SERVER_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})


export class BasicAuthenticationService {

  correctUsername='admin'
  correctPwd='admin123'
  constructor(private http: HttpClient) { }



  executeJwtAuthService(username, password) {

    return this.http.post<any>(
      `${API_SERVER_URL}/authenticate`,{username, password}).pipe(
        map(data => {
          this.setAuthenticatedUser(username);         
          this.setAuthToken(`Bearer ${data.token}`);          
          return data;
        })
      );

  }

  executeAuthService(username, password) {
    let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':'+ password);
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(
      `${API_SERVER_URL}/alms/basicauth`, {headers}).pipe(
        map(data => {
          this.setAuthenticatedUser(username);         
          this.setAuthToken(basicAuthHeaderString);          
          return data;
        })
      );

  }

  setAuthenticatedUser(username) {
    sessionStorage.setItem(AUTHENTICATED_USER, username);
  }
  setAuthToken(token) {
    sessionStorage.setItem(TOKEN, token);
  }
  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthToken(){
    if(this.getAuthenticatedUser())
       return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn(){
    let user = this.getAuthenticatedUser();
    return !(user ===null);

  }
  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean {
  constructor(public message:string) {}
}