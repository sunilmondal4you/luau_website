import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _underscore from 'underscore';
import { ApiService } from './api.service';
import { globalVars } from './global';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private userData:any = {};

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {};

  public tokenPostCall(){
    this.userData = globalVars;

    let clintSecret;
    let getTokenURL;

    if(window.location.host=="luauet.com"){
      clintSecret= "1e521acb-cd91-4e87-bfc9-0626613d01d1";
      getTokenURL= "https://prod.keycloak.luauet.com/auth/realms/luau-prod/protocol/openid-connect/token";
    }else if(window.location.host=="dev.dashboard.luauet.com"){
      clintSecret= "c8c393b3-b9f0-4aa1-988c-7f12d4caacd7";
      getTokenURL= "https://dev.keycloak.luauet.com/auth/realms/luau-dev/protocol/openid-connect/token";
    }else {
      clintSecret= "c8c393b3-b9f0-4aa1-988c-7f12d4caacd7";
      getTokenURL= "https://dev.keycloak.luauet.com/auth/realms/luau-dev/protocol/openid-connect/token";
    }
      
    let params
    if(!this.userData.refresh_token){
      params = new HttpParams({
        fromObject: {
          client_id: "luau-app",
          client_secret: clintSecret,
          grant_type: "client_credentials"
        }
      });
    }else{  
      params = new HttpParams({
        fromObject: {
          client_id    : "luau-app",
          client_secret: clintSecret,
          grant_type   : "refresh_token",
          refresh_token: this.userData.refresh_token,
        }
      });
    }
    
    let takenConfig = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(getTokenURL,params,{ headers: takenConfig });
  };

}
