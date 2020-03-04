import { Injectable } from '@angular/core';

@Injectable()
export class globalVars {
    static userObj:any={};
    static access_token:any = ""
    static refresh_token:any = ""
    static selProductDetail:any = [];
    static selOrderId:any = [];
    static flaggedInputData:any = {};
    static LMOI = false;
    static OEP = false
;}