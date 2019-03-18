import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://192.168.1.29/luau-api/scripts/';

  constructor(private httpClient: HttpClient) {};

}
