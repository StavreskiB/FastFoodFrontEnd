import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenReq } from '../models/tokenReq';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  restUrl  = environment.RestUrl;

  constructor(private http : HttpClient) {
   }

   Login(token : TokenReq){
    console.log(this.http.post<any>(this.restUrl + 'jwt/authenticate', token))
    return this.http.post<any>(this.restUrl + 'jwt/authenticate', token);
   }

   IsTokenExpired(){
    return this.http.get<any>(this.restUrl + 'jwt/isTokenExpired');
   }

   SaveNewUser(users : Users){
    return this.http.post<any>(this.restUrl + 'jwt/saveNewEmployee', users);
   }

   test(){
    return this.http.get<any>(this.restUrl + 'jwt/testApi');
   }

   getAllEmployee(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
    return this.http.get<any>(this.restUrl + 'jwt/getAllEmployee', {headers : headers});
   }

   getEmpById(companyId, empId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
                     .set('employeeId', empId.toString())
    return this.http.get<any>(this.restUrl + 'jwt/getEmpById', {headers : headers});
   }

   UpdateUser(users : Users, updateId){
    let headers = new HttpHeaders();
    headers = headers.set('updateId', updateId.toString());
    return this.http.post<any>(this.restUrl + 'jwt/updateEmployee', users, {headers : headers});
   }

}
