import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as sha512 from 'js-sha512';
import * as _underscore from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURLProd: string = 'https://prod.api.luauet.com/luau-api/scripts/';
  apiURLStaging: string = 'http://dev.api.luauet.com/luau-api/scripts/';

  // apiURLDev: string = 'https://prod.api.luauet.com/luau-api/scripts/';
  apiURLDev: string = 'http://dev.api.luauet.com/luau-api/scripts/';
  // apiURLDev: string = 'http://192.168.1.55/luau-api/scripts/';
  config = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  hashSalt = "#$%@SaltCreationForAuthentication#$%@";

  omBaseURL = "http://dev.olympusmons.luauet.com/luau/v1/";

  private userObj = new BehaviorSubject<any>({"loggedIn":false,"userDetail":{},"modalObj":{}});
  public userObjObserveable = this.userObj.asObservable();
  
  constructor(
    private http: HttpClient,
  ) {};

  public customPostApiCall(customdata:any){
    if(customdata.email){
      let hashkey = customdata.email + this.hashSalt;
      customdata.authToken = sha512.sha512(hashkey);
    }else if(customdata.product_id){
      let hashkey = customdata.product_id + this.hashSalt;
      customdata.authToken = sha512.sha512(hashkey);
    }
    
    let apiURL;
    if(window.location.host=="luauet.com"){
      apiURL=this.apiURLProd;
    }else if(window.location.host=="dev.dashboard.luauet.com")
      apiURL=this.apiURLStaging;
    else {
      apiURL=this.apiURLDev;
    }

    let finalApi = `${apiURL}`+ customdata.apiExt;
    return this.http.post(finalApi,customdata,{ headers: this.config });
  };

  public updateUserDetail(reqObj:any) {
    this.userObj.next(reqObj);
  };


  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage+2;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _underscore.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  };

  public olympusmonsPostApiCall(customdata,reqParams){
    let finalApi = this.omBaseURL+ customdata.apiExt;
    return this.http.post(finalApi,reqParams,{ headers: { 'Authorization': 'Bearer ' + customdata.access_token }});
  };

  public olympusmonsGetApiCall(customdata, reqParams){
    reqParams = reqParams || {};
    const params = new HttpParams({fromObject: reqParams});
    let finalApi = this.omBaseURL + customdata.apiExt;

    return this.http.get(finalApi,{params, headers: { 'Authorization': 'Bearer ' + customdata.access_token }});
  };

  public olympusmonsDelApiCall(customdata, reqParams){
    reqParams = reqParams || {};
    let finalApi = this.omBaseURL+ customdata.apiExt;
    return this.http.delete(finalApi, { headers: { 'Authorization': 'Bearer ' + customdata.access_token, 'responseType': 'text' as 'json' }});
  };

}
