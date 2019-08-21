import { Injectable } from '@angular/core';

@Injectable()
export class globalVars {
    static userObj:any={};
    static access_token:String = ""
    static refresh_token:String = ""
}