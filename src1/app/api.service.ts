import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as sha512 from 'js-sha512';
import * as _underscore from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrlPHP: String = 'https://prod.api.luauet.com/luau-api/scripts/';
  baseUrlOM: String = 'https://prod.olympusmons.luauet.com/luau/';

  config = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  hashSalt = "#$%@SaltCreationForAuthentication#$%@";

  private localUserObj = JSON.parse(localStorage.getItem("userObj"));  
  private userObj = new BehaviorSubject<any>({loggedIn: false});
  public userObjObserveable = this.userObj.asObservable();
  
  constructor(
    private http: HttpClient,
  ) {};

  public updateUserDetail(reqObj:any) {
    this.userObj.next(reqObj);
  };

  setBaseURL() {
    if(window.location.host == "luauet.com") {
        this.baseUrlOM="https://prod.olympusmons.luauet.com/luau/"
        this.baseUrlPHP="https://prod.api.luauet.com/luau-api/scripts/"        
    } else if(window.location.host == "dev.dashboard.luauet.com") {
        this.baseUrlOM="http://dev.olympusmons.luauet.com/luau/"
        this.baseUrlPHP="http://dev.api.luauet.com/luau-api/scripts/"
    } else {
        this.baseUrlOM="http://dev.olympusmons.luauet.com/luau/"
        this.baseUrlPHP="http://dev.api.luauet.com/luau-api/scripts/"
    }
  };

  public customPostApiCall(customdata:any){
    if(customdata.email) {
      let hashkey = customdata.email + this.hashSalt;
      customdata.authToken = sha512.sha512(hashkey);
    } else if(customdata.product_id){
      let hashkey = customdata.product_id + this.hashSalt;
      customdata.authToken = sha512.sha512(hashkey);
    }
    let finalApi = `${this.baseUrlPHP}`+ customdata.apiExt;
    return this.http.post(finalApi,customdata,{ headers: this.config });
  };

  public olympusmonsPostApiCall(customdata, reqParams){
    let finalApi = this.baseUrlOM + customdata.apiExt;
    return this.http.post(finalApi,reqParams,{ headers: { 'Authorization': 'Bearer ' + customdata.access_token }});
  };

  public olympusmonsGetApiCall(customdata, reqParams){
    reqParams = reqParams || {};
    const params = new HttpParams({fromObject: reqParams});
    let finalApi = this.baseUrlOM + customdata.apiExt;
    return this.http.get(finalApi,{params, headers: { 'Authorization': 'Bearer ' + customdata.access_token }});
  };

  public olympusmonsDelApiCall(customdata, reqParams){
    reqParams = reqParams || {};
    let finalApi = this.baseUrlOM + customdata.apiExt;
    return this.http.delete(finalApi, { headers: { 'Authorization': 'Bearer ' + customdata.access_token, 'responseType': 'text' as 'json' }});
  };

}
