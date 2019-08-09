import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import * as _underscore from 'underscore';
import {MatDialog} from '@angular/material';

export interface PeriodicElement {
  tag_name: string;
  synonyms: string;
}

@Component({
  selector: 'app-tagsdatabase',
  templateUrl: './tagsdatabase.component.html',
  styleUrls: ['./tagsdatabase.component.css']
})

export class TagsdatabaseComponent implements OnInit {
  public userData:any = {};
  searchForm: FormGroup;
  tagCreateForm: FormGroup;
  loaderStart = false;
  submitted = false;

  TAG_LIST: PeriodicElement[] = [
    {"tag_name": "Brand Signup",     "synonyms":"brand"},
    {"tag_name": "Press Inquiries",  "synonyms":"inquiries"},
    {"tag_name": "Customer Service", "synonyms":"services"},
    {"tag_name": "Support",          "synonyms":"support"},
    {"tag_name": "Dashboard",        "synonyms":"dashboard"},
    {"tag_name": "Brand Signup",     "synonyms":"brand"},
    {"tag_name": "Press Inquiries",  "synonyms":"inquiries"},
    {"tag_name": "Customer Service", "synonyms":"services"},
    {"tag_name": "Support",          "synonyms":"support"},
    {"tag_name": "Dashboard",        "synonyms":"dashboard"},
  ];

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
    private commonService: CommonService,
    private dialogRef: MatDialog,
  ) { }


  ngOnInit() {
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
    });

    this.getTagList();

    this.searchForm = this.formBuilder.group({
      tag_name: ['', Validators.required],
    });

    this.tagCreateForm = this.formBuilder.group({
      tag_name: ['', Validators.required],
      synonyms: [''],
    });
  }
  get f() { return (this.searchForm.controls && this.tagCreateForm.controls)};

  getTagList(){
    // this.loaderStart = true;
    let tagListReqObj = {
      "page" : this.userData.userDetail.page || 0,
      "user_id": this.userData.userDetail.user_id || 1,
      "token": this.userData.userDetail.token,
      "apiExt"    : "luauet-get-tag-data.php",
    }
    // this.apiService.customPostApiCall(tagListReqObj).subscribe((res:any)=>{
    //   if(res){
    //     this.loaderStart = false;
    //     this.TAG_LIST = res.objects || [];
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

  clearSearchField(){
    this.searchForm = this.formBuilder.group({
      tag_name: ['', Validators.required],
    });
  };

  onTagSsearch() {
    if(this.searchForm.value.tag_name=="") {
      this.getTagList();
    }else{
      let searchObj = {
        "user_id"  : this.userData.userDetail.user_id,
        "tage_name": this.searchForm.value.tag_name,
        "token"    : this.userData.userDetail.token,
        "apiExt"   : "luauet-search-tag.php",
      };
      // this.apiService.customPostApiCall(searchObj).subscribe((res:any)=>{
      //   if(res){
      //     if(res.objects){
      //       this.TAG_LIST = res.objects || [];
      //     }
      //   }else{
      //     this.commonService.modalOpenMethod("Something wents wrong.");
      //   }
      // },
      // (error) => {
      //   if(error.status==401){
      //     this.commonService.clearStorage("dashboard");
      //   }else{
      //     this.commonService.modalOpenMethod(error.message)        }
      // });
    }

  };

  createNewTag() {
    this.submitted = true;

    // stop here if form is invalid
    if(this.tagCreateForm.invalid) {
        return;
    }else{
      let createTagObj = {
        "tag_name"        : this.tagCreateForm.value.tag_name,
        "synonyms"        : this.tagCreateForm.value.synonyms,
        "authToken"       : this.userData.userDetail.token,
        "apiExt"          : "brand_signup.php",
      };
      // this.apiService.customPostApiCall(createTagObj).subscribe((res:any)=>{
      //   if(res){
      //     if(res.status == "success"){
      //       this.ngOnInit();
      //       this.submitted = false;
      //     }
      //     this.commonService.modalOpenMethod(res.message);
      //   }else{
      //     this.commonService.modalOpenMethod("Something wents wrong.");
      //   }
      // },
      // (error) => {
      //   if(error.status==401){
      //     this.commonService.clearStorage("home");
      //   }else{
      //     this.commonService.modalOpenMethod(error.message)
      //   }
      // });
    };
  };

  deleteTagConfirmation(selTag:any){
    this.dialogRef.closeAll();
    let message = "Are you sure you want to cancel order-"+selTag.tag_name
    this.commonService.openDialog(message).subscribe((res:any)=>{
      if(res) {
        this.deleteSelTag(selTag)
      }
    },
    (error) => {});
  };

  deleteSelTag(selTag:any){
    let deleteTagObj = {
      "tag_id"   : selTag.id,
      "tag_name" : selTag.local_order_id,
      "synonyms" : selTag.product_details.name,
      "user_id"  : this.userData.userDetail.user_id,
      "token"    : this.userData.userDetail.token,
      "apiExt"   : "luauet-delete-tag.php",
    }
    // this.apiService.customPostApiCall(deleteTagObj).subscribe((res:any)=>{
    //   if(res){
    //     this.commonService.modalOpenMethod(res.message);
    //     this.getTagList();
    //   }else{
    //     this.commonService.modalOpenMethod("Something wents wrong at order cancel");
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
