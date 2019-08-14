import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _underscore from 'underscore';
import { ApiService } from './api.service';

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
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
    });
      
    let params
    if(!this.userData.userDetail.refresh_token){
      params = new HttpParams({
        fromObject: {
          client_id: "luau-app",
          client_secret: "c8c393b3-b9f0-4aa1-988c-7f12d4caacd7",
          grant_type: "client_credentials"
        }
      });
    }else{  
      params = new HttpParams({
        fromObject: {
          client_id    : "luau-app",
          client_secret: "c8c393b3-b9f0-4aa1-988c-7f12d4caacd7",
          grant_type   : "refresh_token",
          refresh_token: this.userData.userDetail.refresh_token,
        }
      });
    }
    
    let getTokenURL = "https://dev.keycloak.luauet.com/auth/realms/luau-dev/protocol/openid-connect/token";
    let takenConfig = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(getTokenURL,params,{ headers: takenConfig });
  };

}
