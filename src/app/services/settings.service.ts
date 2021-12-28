import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  restUrl  = environment.RestUrl;

  constructor(private http : HttpClient) {
  }

  savePersonalInfo(settings : Settings){
    return this.http.post<any>(this.restUrl + 'settings/savePersonalInfo', settings)
  }

  saveShiftInfo(settings : Settings){
    return this.http.post<any>(this.restUrl + 'settings/saveShiftInfo', settings)
  }

  saveLimitInfo(settings : Settings){
    return this.http.post<any>(this.restUrl + 'settings/saveLimitInfo', settings)
  }

  getSettingsInfo(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
    return this.http.get<any>(this.restUrl + 'settings/getSettingsInfo', {headers : headers})
  }

  getManager(companyId){
    let headers = new HttpHeaders();
    headers = headers.set('companyId', companyId.toString())
    return this.http.get<any>(this.restUrl + 'jwt/getManager', {headers : headers})
  }


  

}
