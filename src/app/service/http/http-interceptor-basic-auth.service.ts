import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService  implements HttpInterceptor{

  constructor(private basicAuthService: BasicAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // let username = "admin"
    // let password = "admin123"
    // let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':'+ password)
    let basicAuthHeaderString = this.basicAuthService.getAuthToken();
    let username = this.basicAuthService.getAuthenticatedUser();

    if(basicAuthHeaderString && username) {
      req = req.clone( {
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }


    return next.handle(req);
    
  }


}
