import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _underscore from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private http: HttpClient,
  ) {};

  public tokenPostCall(){
      
    const params = new HttpParams({
      fromObject: {
        client_id: "luau-app",
        client_secret: "c8c393b3-b9f0-4aa1-988c-7f12d4caacd7",
        grant_type: "client_credentials"
      }
    });
    let getTokenURL = "https://dev.keycloak.luauet.com/auth/realms/luau-dev/protocol/openid-connect/token";
    let takenConfig = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');


    return this.http.post(getTokenURL,params,{ headers: takenConfig });
  };

}
