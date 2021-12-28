import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';
import { Invoiceitem } from '../models/invoiceitem';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  restUrl  = environment.RestUrl;

  constructor(private http : HttpClient) {
  }

  saveNewInvoice(invoice: Invoice){
    return this.http.post<any>(this.restUrl + 'invoice/saveNewInvoice', invoice)
  }

  getAllInvoice(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString());
    return this.http.get<any>(this.restUrl + 'invoice/getAllInvoice', {headers:headers})
  }

  saveInvoiceItem(invoiceItem : Invoiceitem){
    console.log(invoiceItem);
    return this.http.post<any>(this.restUrl + 'invoice/saveInvoiceItem', invoiceItem)
  }
  
  getItemsByInvoiceId(invoiceName){
    let headers = new HttpHeaders();
    headers = headers.set('invoiceName', invoiceName.toString());
    return this.http.get<any>(this.restUrl + 'invoice/getItemsByInvoiceId', {headers : headers})
  }

  getInvoiceByName(invoiceName){
    let headers = new HttpHeaders();
    headers = headers.set('invoiceName', invoiceName.toString());
    return this.http.get<any>(this.restUrl + 'invoice/getInvoiceByName', {headers : headers})
  }

  changeInvoiceStatus(invoiceName){
    let headers = new HttpHeaders();
    headers = headers.set('invoiceName', invoiceName.toString());
    return this.http.get<any>(this.restUrl + 'invoice/changeInvoiceStatus', {headers : headers})
  }
}
