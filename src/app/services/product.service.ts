import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Norms } from '../models/norms';
import { Product } from '../models/product';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  restUrl  = environment.RestUrl;

  constructor(private http : HttpClient) {
  }


  getAllTypeOfProduct(){
    return this.http.get<any>(this.restUrl + 'product/getAllProductType')
  }


  saveNewProduct(product : Product, quantity){
    let headers = new HttpHeaders();
    headers = headers.set('quantity', quantity.toString())
    return this.http.post<any>(this.restUrl + 'product/saveNewProduct', product, {headers : headers})
  }
  
  getAllStockByCompanyId(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('CompanyId', companyId.toString())
    return this.http.get<any>(this.restUrl + 'product/getAllStockByCompanyId', {headers : headers})
  }

  getStockByCompanyId(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('CompanyId', companyId.toString())
    return this.http.get<any>(this.restUrl + 'product/getStockByCompanyId', {headers : headers})
  }


  getProductForStockTable(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('CompanyId', companyId.toString())
    return this.http.get<any>(this.restUrl + 'product/getProductForStockTable', {headers : headers})
  }
  getStockById(companyId, stockId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
                     .set('stockId', stockId.toString());
    return this.http.get<any>(this.restUrl + 'product/getStockById', {headers : headers})
  }

  getStockFromTableByProductId(companyId, productId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
                     .set('productId', productId.toString());
    return this.http.get<any>(this.restUrl + 'product/getStockFromTableByProductId', {headers : headers})
  }

  getProductDataById(companyId, productId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
                     .set('productId', productId.toString())
    return this.http.get<any>(this.restUrl + 'product/getProductDataById', {headers : headers})
  }

  addProductInStock(companyId, productId, quantity){
    let headers = new HttpHeaders();
    headers = headers.append('companyId', companyId.toString())
                     .append('productId', productId.toString())
                     .append('quantity', quantity.toString());
    return this.http.get<any>(this.restUrl + 'product/addProductInStock', {headers : headers})
  }

  getAllProductByCompanyId(companyId){
    let headers = new HttpHeaders();
    headers = headers.append('companyId', companyId.toString());
    return this.http.get<any>(this.restUrl + 'product/getAllProductByCompanyId', {headers : headers})
  }

  addProductInMenu(product : Product){
    return this.http.post<any>(this.restUrl + 'product/saveProductInMenu', product)
  }

  addNewNorms(companyId, idProduct, idProductN, quantity){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
                     .set('idProduct', idProduct.toString())
                     .set('idProductN', idProductN.toString())
                     .set('quantity', quantity.toString());

    return this.http.get<any>(this.restUrl + 'product/addNewNorms', {headers : headers})
  }
  
  getNormsForProductId(idProduct){
    let headers = new HttpHeaders();
    headers = headers.set('idProduct', idProduct.toString())
    return this.http.get<any>(this.restUrl + 'product/getNormsForProductId', {headers : headers})
  }
  
  getNormsById(idNorms){
    let headers = new HttpHeaders();
    headers = headers.set('idNorms', idNorms.toString())
    return this.http.get<any>(this.restUrl + 'product/getNormsById', {headers : headers})
  }
  

  updateNorms(idNorms, quantity){
    let headers = new HttpHeaders();
    headers = headers.set('idNorms', idNorms.toString())
                     .set('quantity', quantity.toString())

    return this.http.get<any>(this.restUrl + 'product/updateNorms', {headers : headers})
  }
 
}
