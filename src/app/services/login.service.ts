import { HttpClient } from '@angular/common/http';
import { TokenReq } from '../models/tokenReq';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  restUrl  = environment.RestUrl;

  constructor(private http : HttpClient) {
   }

   Login(token : TokenReq){
     console.log(token);
    return this.http.post<any>(this.restUrl + 'jwt/authenticate', token)
  }

}
