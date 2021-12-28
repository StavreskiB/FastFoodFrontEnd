import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restUrl  = environment.RestUrl;

  constructor(private http : HttpClient) {
  }

  saveForMark(table, productName, quantity, description, addons, companyId, userInsert, billsType, billsStatus){
     let headers = new HttpHeaders();
     headers = headers.set('table', table.toString())
                      .set('productName', productName.toString())
                      .set('quantity', quantity.toString())
                      .set('description', description.toString())
                      .set('addons', addons.toString())
                      .set('companyId', companyId.toString())
                      .set('userInsert', userInsert.toString())
                      .set('billsType', billsType.toString())
                      .set('billsStatus', billsStatus.toString());

      
    return this.http.get<any>(this.restUrl + 'restaurant/saveForMark', {headers : headers})
  }

  getBillsForMark(table, companyId, type, status){
    let headers = new HttpHeaders();
    headers = headers.set('table', table.toString())
                     .set('companyId', companyId.toString())
                     .set('billsType', type.toString())
                     .set('billsStatus', status.toString());

   return this.http.get<any>(this.restUrl + 'restaurant/getBillsForMark', {headers : headers})
  }

  deleteMark(idBills){
    let headers = new HttpHeaders();
    headers = headers.set('idBills', idBills.toString());
    
   return this.http.get<any>(this.restUrl + 'restaurant/deleteMark', {headers : headers})
  }

  convertToBills(table, companyId){
    let headers = new HttpHeaders();
    headers = headers.set('table', table.toString())
                     .set('companyId', companyId.toString());
    
   return this.http.get<any>(this.restUrl + 'restaurant/convertToBills', {headers : headers})
  }

  getBillsItem(table, companyId){
    let headers = new HttpHeaders();
    headers = headers.set('table', table.toString())
                     .set('companyId', companyId.toString());
    
   return this.http.get<any>(this.restUrl + 'restaurant/getBillsItem', {headers : headers})
  }

  printBills(table, companyId){
    let headers = new HttpHeaders();
    headers = headers.set('table', table.toString())
                     .set('companyId', companyId.toString());
    
   return this.http.get<any>(this.restUrl + 'restaurant/printBills', {headers : headers})
  }

  getReservedTable(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString());
    
   return this.http.get<any>(this.restUrl + 'restaurant/getReservedTable', {headers : headers})
  }
}
