import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as sha512 from 'js-sha512';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://192.168.1.29/luau-api/scripts/';

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
  ) { }

  //   let config = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  //   let hashSalt = "#$%@SaltCreationForAuthentication#$%@"
  //   let hashkey = this.servicesForm.value.email + hashSalt;

  // public customPostApiCall(customdata){

  //   return this.httpClient.post(`${this.apiURL}/customers/`,customer);
  // }

}
