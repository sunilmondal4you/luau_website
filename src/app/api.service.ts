import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as sha512 from 'js-sha512';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://dev.api.luauet.com/luau-api/scripts/';
  // apiURL: string = 'http://192.168.1.126/luau-api/scripts/';
  config = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  hashSalt = "#$%@SaltCreationForAuthentication#$%@"

  constructor(
    private http: HttpClient,
  ) {};

  public customPostApiCall(customdata){
    if(customdata.email){
      let hashkey = customdata.email + this.hashSalt;
      customdata.authToken = sha512.sha512(hashkey);
    }else if(customdata.product_id){
      let hashkey = customdata.product_id + this.hashSalt;
      customdata.authToken = sha512.sha512(hashkey);
    }
    
    let finalApi = `${this.apiURL}`+ customdata.apiExt;
    return this.http.post(finalApi,customdata,{ headers: this.config });
  }

}
