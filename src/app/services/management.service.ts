import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  restUrl  = environment.RestUrl;

  constructor(private http : HttpClient) {
   }

  getReports(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
    return this.http.get<any>(this.restUrl + 'management/getReports', {headers : headers});
   }

   getItemForExpPanel(companyId, dateForReport, shift){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
                     .set('dateForReport', dateForReport.toString())
                     .set('shift', shift.toString());
    return this.http.get<any>(this.restUrl + 'management/getItemForExpPanel', {headers : headers});
   }
   
   getDataForDelivery(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString());

    return this.http.get<any>(this.restUrl + 'management/getDataForDelivery', {headers : headers})
  }

  getDataForTotalOrders(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString());

    return this.http.get<any>(this.restUrl + 'management/getDataForTotalOrders', {headers : headers})
  }

  getTotalPriceForBills(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString());

    return this.http.get<any>(this.restUrl + 'management/getTotalPriceForBills', {headers : headers})
  }

}
