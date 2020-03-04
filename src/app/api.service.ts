import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as sha512 from 'js-sha512';
import { Router } from '@angular/router';
import * as _underscore from 'underscore';
import { globalVars } from './global';
import { TokenService } from './token.service';

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
    private router: Router,
    private http: HttpClient,
    private tokenService : TokenService,
  ) {};

  public updateUserDetail(reqObj:any) {
    this.userObj.next(reqObj);
  };

  setBaseURL() {
    if((window.location.host == "luauet.com") || (window.location.host == "www.luauet.com")) {
        this.baseUrlOM="https://prod.olympusmons.luauet.com/luau/"
        this.baseUrlPHP="https://prod.api.luauet.com/luau-api/scripts/"        
    } else if(window.location.host == "dev.dashboard.luauet.com") {
        this.baseUrlOM="http://dev.olympusmons.luauet.com/luau/"
        this.baseUrlPHP="http://dev.api.luauet.com/luau-api/scripts/"
    } else {
        this.baseUrlOM="http://dev.olympusmons.luauet.com/luau/"
        // this.baseUrlPHP="http://dev.api.luauet.com/luau-api/scripts/"
        this.baseUrlPHP="http://192.168.1.188/luau-api/scripts/"
    }
  };

  public customPostApiCall(customdata:any){
    let parentApiObj = {"apiType":"post", "apiCallFrom":"customPostApiCall"};

    if(customdata.email) {
      let hashkey = customdata.email + this.hashSalt;
      customdata.authToken = sha512.sha512(hashkey);
    } else if(customdata.product_id){
      let hashkey = customdata.product_id + this.hashSalt;
      customdata.authToken = sha512.sha512(hashkey);
    }
    let finalApi = `${this.baseUrlPHP}`+ customdata.apiExt;
    return this.phpCustmRespCall(finalApi,customdata,{ headers: this.config },parentApiObj);
  };

  public phpCustmRespCall(finalApi, customdata, headers, parentApiObj){
    let ref = this;
    let promise = new Promise((resolve, reject) => {
      this.http[parentApiObj.apiType](finalApi,customdata,headers).subscribe((res:any)=>{ 
        if(res.message && window.location.pathname != '/dashboard' && customdata.apiExt != 'luauet-dashboard-logout.php'){
          this.tokenService.modalOpenMethod(res.message);
          resolve(res);
        }else if(res && res.message && res.status=="failure"){
          this.tokenService.modalOpenMethod(res.message);
          resolve(res);
        }else if(!res){
          this.tokenService.modalOpenMethod("Something went wrong please try again");
          resolve(res);
        }else{
          resolve(res);
        }
      },
      (error) => {
        if(error.status==401){
          let updateReqObj = {
              "loggedIn": false,"dispMainMenu" : true,"userDetail": {},
          };
          let tempObj = {
              "loggedIn": false,
              "dispMainMenu" : true
          }
          this.updateUserDetail(tempObj);
          localStorage.setItem('userObj', JSON.stringify(updateReqObj));
          this.router.navigate(['/dashboard']);
        }else if(error.status!=200){
          this.tokenService.modalOpenMethod(error.message);
          reject(error);
        }else{
          reject(error);
        }
      })
    })
    return promise;
  };

  public olympusmonsPostApiCall(customdata, reqParams){
    reqParams = reqParams || {};
    let finalApi = this.baseUrlOM + customdata.apiExt;
    let parentApiObj = {"apiType":"post", "apiCallFrom":"olympusmonsPostApiCall","customdata":customdata,"reqParams":reqParams};
    return this.olympusmonsCustmRespCall(finalApi,reqParams, parentApiObj, { headers: { 'Authorization': 'Bearer ' + customdata.access_token }});
  };

  public olympusmonsGetApiCall(customdata, reqParams){
    reqParams = reqParams || {};
    let finalApi = this.baseUrlOM + customdata.apiExt;
    let parentApiObj = {"apiType":"get", "apiCallFrom":"olympusmonsGetApiCall","customdata":customdata,"reqParams":reqParams};
    return this.olympusmonsCustmRespCall(finalApi,{headers: { 'Authorization': 'Bearer ' + customdata.access_token }}, parentApiObj);
  };

  public olympusmonsDelApiCall(customdata, reqParams){
    reqParams = reqParams || {};
    let finalApi = this.baseUrlOM + customdata.apiExt;
    let parentApiObj = {"apiType":"delete", "apiCallFrom":"olympusmonsDelApiCall","customdata":customdata,"reqParams":reqParams};
    return this.olympusmonsCustmRespCall(finalApi, {headers: { 'Authorization': 'Bearer ' + customdata.access_token, 'responseType': 'text' as 'json' }}, parentApiObj);
  };

  public olympusmonsCustmRespCall(finalApi, params1, parentApiObj, params2={}){
    let ref = this;
    let promise = new Promise((resolve, reject) => {
      this.http[parentApiObj.apiType](finalApi,params1,params2).subscribe((res:any)=>{ 
        if(res.message && parentApiObj.reqParams.actionName != "REINDEX_RETAILER"){
          this.tokenService.modalOpenMethod(res.message);
          resolve(res);
        }else if(res && res.message && res.status=="failure"){
          this.tokenService.modalOpenMethod(res.message);
          resolve(res);
        }else if(!res){
          this.tokenService.modalOpenMethod("Something went wrong please try again");
          resolve(res);
        }else{
          resolve(res);
        }
      },
      (error) => {
        if(error.status==401){
          this.tokenService.tokenPostCall(function(){
            parentApiObj.customdata.access_token = globalVars.access_token;
            ref[parentApiObj.apiCallFrom](parentApiObj.customdata, parentApiObj.reqParams).then(
              (res:any)=>{resolve(res)},
              (error)=>{reject(error)}
            );
          })
        }else if(error.status!=200){
          this.tokenService.modalOpenMethod(error.message);
          reject(error);
        }else{
          reject(error);
        }
      })
    })
    return promise;
  };

}
