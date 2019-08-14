import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { TokenService } from './../token.service';
import { CommonService } from './../common.service';
import * as _underscore from 'underscore';
import {MatDialog} from '@angular/material';

export interface PeriodicElement {
  name: string;
  luauTagSynonyms: [];
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
  formSubmitted = false;
  pageSize = 50;
  page = 0;

  TAG_LIST: PeriodicElement[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
    private tokenService : TokenService,
    private commonService: CommonService,
    private dialogRef: MatDialog,
  ) { }

  ngOnInit() {
    this.loaderStart = true;
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
      if(!this.userData.userDetail.refresh_token){
        this.getKeycloakToken(function(){});
      }else{
        this.getTagList();
      }
    });

    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.tagCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      synonyms: [''],
    });
  }
  get f() { return (this.searchForm.controls && this.tagCreateForm.controls)};

  getKeycloakToken(callback){
    this.tokenService.tokenPostCall().subscribe((res:any)=>{
      if(res){
        if(res.refresh_token){
          this.userData.userDetail.access_token = res.access_token;
          this.userData.userDetail.refresh_token = res.refresh_token;
          this.apiService.updateUserDetail(this.userData);
          callback();
        }
      }
    });
  }

  getTagList(){
    let ref = this;
    this.submitted = false;
    this.loaderStart = true;
    let tagListReqObj = {
      "apiExt"  : 'products-tags?size='+this.pageSize+'&page='+this.page,
      "access_token"   : this.userData.userDetail.access_token,
    }
    let reqParams = {
      "size"    : this.pageSize,
      "page"    : 0,
    };
    this.apiService.olympusmonsGetApiCall(tagListReqObj, reqParams).subscribe((res:any)=>{  
      if(res){
        this.loaderStart = false;
        this.TAG_LIST = res.content || [];
      }else{
        this.loaderStart = false;
        this.commonService.modalOpenMethod("Something wents wrong on Order Call!");
      }
    },
    (error) => {
      this.loaderStart = false;
      if(error.status==401){
        this.getKeycloakToken(function() {
          ref.getTagList();
        });
      }else if(error.status!=200){
        this.commonService.modalOpenMethod(error.message);
      }
    });
  };

  clearSearchField(){
    this.submitted = false;
    this.searchForm.value.name = "";
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.getTagList()
  };

  onTagSsearch() {
    let ref = this;
    if(this.searchForm.value.name=="") {
      this.submitted = true;
      this.getTagList();
    }else{
      let searchObj = {
        "apiExt"  : 'products-tags/search?tagName='+this.searchForm.value.name+'&size='+this.pageSize+'&page='+this.page,
        "access_token"   : this.userData.userDetail.access_token,
      }
      let reqParams = {
        "size"    : this.pageSize,
        "page"    : 0,
      };
      this.apiService.olympusmonsGetApiCall(searchObj, reqParams).subscribe((res:any)=>{
        if(res){      
          this.submitted = false;    
          this.loaderStart = false;
          this.TAG_LIST = res.content || [];
        }else{
          this.commonService.modalOpenMethod("Something wents wrong.");
        }
      },
      (error) => {
        if(error.status==401){
          this.getKeycloakToken(function() {
            ref.onTagSsearch();
          });
        }else if(error.status!=200){
          this.commonService.modalOpenMethod(error.message)        
        }
      });
    }

  };

  createNewTag() {
    let ref = this;
    this.formSubmitted = true;

    // stop here if form is invalid
    if(this.tagCreateForm.invalid) {
        return;
    }else{
      let synonymsObj = this.tagCreateForm.value.synonyms?{"name": this.tagCreateForm.value.synonyms} : "";
      
      let createTagObj = {
        "luauTagSynonyms" : [],
        "access_token"       : this.userData.userDetail.access_token,
        "apiExt"          : "products-tags?",
      };
      createTagObj.luauTagSynonyms.push(synonymsObj);
      
      let reqParams = {
        "name"            : this.tagCreateForm.value.name,
        "active"          : true,
        "luauTagSynonyms" : createTagObj.luauTagSynonyms,
      };
      this.apiService.olympusmonsPostApiCall(createTagObj,reqParams).subscribe((res:any)=>{
        if(res){
          if(res.id){
            this.TAG_LIST.push(res)
            this.commonService.modalOpenMethod("Tag created successfully");

            // this.ngOnInit();
            this.formSubmitted = false;
          }
        }else{
          this.commonService.modalOpenMethod("Something wents wrong.");
        }
      },
      (error) => {
        if(error.status==401){
          this.getKeycloakToken(function() {
            ref.createNewTag();
          });
        }
      });
    }
  };

  deleteTagConfirmation(selTag:any){
    this.dialogRef.closeAll();
    let message = "Are you sure you want to cancel order-"+selTag.name
    this.commonService.openDialog(message).subscribe((res:any)=>{
      if(res) {
        this.deleteSelTag(selTag)
      }
    },(error) => {});
  };

  deleteSelTag(selTag:any){
    let ref = this;
    let deleteTagObj = {
      "access_token"    : this.userData.userDetail.access_token,
      "apiExt"   : "products-tags/"+selTag.id,
    }
    let reqParams = {
      "tag-id": selTag.id,
    };
    this.apiService.olympusmonsDelApiCall(deleteTagObj,reqParams).subscribe((res:any)=>{
      if(res){
        this.commonService.modalOpenMethod(res.message);
        this.getTagList();
      }else{
        this.commonService.modalOpenMethod("Something wents wrong at order cancel");
      }
    },
    (error) => {
      if(error.status==401){
        this.getKeycloakToken(function() {
          ref.deleteSelTag(selTag);
        })
      }else if(error.status!=200){
        this.commonService.modalOpenMethod(error.message);
      }
    });
  };
  

}
