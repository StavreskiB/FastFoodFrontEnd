import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  restUrl  = environment.RestUrl;

  constructor(private http : HttpClient) {
   }

   getCompany(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
    return this.http.get<any>(this.restUrl + 'company/getCompanyById', {headers:headers})
   }
}
