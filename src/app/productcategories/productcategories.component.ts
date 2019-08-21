import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import * as _underscore from 'underscore';
import {MatDialog} from '@angular/material';

export interface PeriodicElement {
  ID: number;
  categories: string;
  frontend_categories: string;
}

@Component({
  selector: 'app-productcategories',
  templateUrl: './productcategories.component.html',
  styleUrls: ['./productcategories.component.css']
})
export class ProductcategoriesComponent implements OnInit {

  public userData:any = {};
  loaderStart = false;
  submitted = false;
  formSubmitted = false;


  CATEGORIES_LIST: PeriodicElement[] = [
    {"ID":1,  "categories": "Brand Signup",     "frontend_categories":"brand"},
    {"ID":2,  "categories": "Press Inquiries",  "frontend_categories":"inquiries"},
    {"ID":3,  "categories": "Customer Service", "frontend_categories":"services"},
    {"ID":4,  "categories": "Support",          "frontend_categories":"support"},
    {"ID":5,  "categories": "Dashboard",        "frontend_categories":"dashboard"},
    {"ID":6,  "categories": "Brand Signup",     "frontend_categories":"brand"},
    {"ID":7,  "categories": "Press Inquiries",  "frontend_categories":"inquiries"},
    {"ID":8,  "categories": "Customer Service", "frontend_categories":"services"},
    {"ID":9,  "categories": "Support",          "frontend_categories":"support"},
    {"ID":10, "categories": "Dashboard",        "frontend_categories":"dashboard"},
    {"ID":11, "categories": "Brand Signup",     "frontend_categories":"brand"},
    {"ID":12, "categories": "Press Inquiries",  "frontend_categories":"inquiries"},
    {"ID":13, "categories": "Customer Service", "frontend_categories":"services"},
    {"ID":14, "categories": "Support",          "frontend_categories":"support"},
    {"ID":15, "categories": "Dashboard",        "frontend_categories":"dashboard"},
  ];

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
    private commonService: CommonService,
    private dialogRef: MatDialog,
  ) { }


  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userObj")); 

    this.getCategoriesList();
  }

  getCategoriesList(){
    this.submitted = false;
    // this.loaderStart = true;
    let categoriesReqObj = {
      "page" : this.userData.userDetail.page || 0,
      "user_id": this.userData.userDetail.user_id || 1,
      "token": this.userData.userDetail.token,
      "apiExt"    : "luauet-get-categories-data.php",
    }
    // this.apiService.customPostApiCall(categoriesReqObj).subscribe((res:any)=>{
    //   if(res){
    //     this.loaderStart = false;
    //     this.CATEGORIES_LIST = res.objects || [];
    //   }else{
    //     this.loaderStart = false;
    //     this.commonService.modalOpenMethod("Something wents wrong on Order Call!");
    //   }
    // },
    // (error) => {
    //   if(error.status==401){
    //     this.commonService.clearStorage("dashboard");
    //   }else{
    //     this.commonService.modalOpenMethod(error.message);
    //   }
    // });
  };


}
