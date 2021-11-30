import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  TOKEN_HEADER_KEY : any = 'Authorization';

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const jwt = sessionStorage.getItem("jwt");
      if (jwt) {
          const cloned = req.clone({
              headers: req.headers.set(this.TOKEN_HEADER_KEY,
                  'Bearer ' + jwt)
                  .set("Application", "GreenPassPlus")            
          });
           
          return next.handle(cloned);
      }
      else {
          return next.handle(req);
      }
  }}
