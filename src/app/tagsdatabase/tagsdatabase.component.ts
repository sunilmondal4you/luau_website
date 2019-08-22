import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { TokenService } from './../token.service';
import { CommonService } from './../common.service';
import { globalVars } from './../global';
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
  page = 0

  TAG_LIST = [];
  createBtnDissable=false;
  deleteBtnDissable = false;

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
    private tokenService : TokenService,
    private commonService: CommonService,
    private dialogRef: MatDialog,
  ) { }

  ngOnInit() {
    window.location.pathname == "/tagsdatabase"
    let ref = this;
    this.loaderStart = true;
    
    if(!this.userData.refresh_token){
      this.userData = JSON.parse(localStorage.getItem("userObj")) || globalVars.userObj;
      this.userData.page = 0;
      this.getKeycloakToken(function(){ref.ngOnInit();});
    }else{
      this.getTagList();
    }

    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.tagCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      synonyms: [''],
    });
  }
  get f() { return (this.searchForm.controls && this.tagCreateForm.controls)};

  onResize(event) {
    /* Calculate TagList section hieght */
    this.calculateCardHieght()
  };

  calculateCardHieght(){
    setTimeout(function(){ 
      let wh = window.innerHeight;
      let id3Ele = document.getElementById("id3");
      let id3Ht = id3Ele.offsetHeight;
      let id2Ele = document.getElementById("id2");
      let id2Bound = id2Ele.getBoundingClientRect();
      let id2PosTop = id2Bound.top;
      let id2Ht = wh-id2PosTop-id3Ht;
      document.getElementById("id2").style.height = id2Ht+"px";
     }, 200);
  };

  getKeycloakToken(callback){
    this.tokenService.tokenPostCall().subscribe((res:any)=>{
      if(res){
        if(res.refresh_token){
          // globalVars.userObj.loggedIn=true;
          this.userData.access_token = res.access_token;
          this.userData.refresh_token = res.refresh_token;
          localStorage.setItem('userObj', JSON.stringify(globalVars.userObj));
          callback();
        }
      }
    });
  };

  getTagList(){
    let ref = this;
    this.submitted = false;
    this.loaderStart = true;
    let tagListReqObj = {
      "apiExt"  : 'v1/products-tags?size='+this.pageSize+'&page='+this.userData.page,
      "access_token"   : this.userData.access_token,
    }
    let reqParams = {
      "size"    : this.pageSize,
      "page"    : this.userData.page,
    };
    this.apiService.olympusmonsGetApiCall(tagListReqObj, reqParams).subscribe((res:any)=>{  
      if(res){
        this.loaderStart = false;
        this.TAG_LIST = res.content || [];

        /* Calculate TagList section hieght */
        this.calculateCardHieght();
        
      }else{
        this.loaderStart = false;
        this.commonService.modalOpenMethod("Something wents wrong to get Tab Data");
      }
    },
    (error) => {
      this.calculateCardHieght()
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
        "apiExt"  : 'v1/products-tags/search?tagName='+this.searchForm.value.name+'&size='+this.pageSize+'&page='+this.userData.page,
        "access_token"   : this.userData.access_token,
      }
      let reqParams = {
        "size"    : this.pageSize,
        "page"    : this.userData.page,
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
    this.createBtnDissable = true;

    // stop here if form is invalid
    if(this.tagCreateForm.invalid) {
        return;
    }else{
      let synonymsObj = this.tagCreateForm.value.synonyms?{"name": this.tagCreateForm.value.synonyms} : {};
      
      let createTagObj = {
        "luauTagSynonyms" : [],
        "access_token"    : this.userData.access_token,
        "apiExt"          : "v1/products-tags?",
      };
      createTagObj.luauTagSynonyms.push(synonymsObj);
      
      let reqParams = {
        "name"            : this.tagCreateForm.value.name.toString().trim(),
        "active"          : true,
        "luauTagSynonyms" : createTagObj.luauTagSynonyms,
      };
      this.apiService.olympusmonsPostApiCall(createTagObj,reqParams).subscribe((res:any)=>{
        if(res){
          this.createBtnDissable = false;
          if(res.id){
            this.TAG_LIST.push(res);
            this.tagCreateForm = this.formBuilder.group({
              name: ['', Validators.required],
              synonyms: [''],
            });

            this.commonService.modalOpenMethod("Tag created successfully");

            // this.ngOnInit();
            this.formSubmitted = false;
          }else if(res.status="error"){
            this.commonService.modalOpenMethod(res.message);
          }
        }else{
          this.createBtnDissable = false;
          this.commonService.modalOpenMethod("Something wents wrong.");
        }
      },
      (error) => {
        this.createBtnDissable = false;
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
    let message = "Are you sure you want to delete tag-"+selTag.name
    this.commonService.openDialog(message).subscribe((res:any)=>{
      if(res) {
        this.deleteSelTag(selTag)
      }
    },(error) => {});
  };

  deleteSelTag(selTag:any){
    let ref = this;
    this.deleteBtnDissable = true;
    let deleteTagObj = {
      "access_token" : this.userData.access_token,
      "apiExt"       : "v1/products-tags/"+selTag.id,
    }
    let reqParams = {
      "tag-id": selTag.id,
    };
    this.apiService.olympusmonsDelApiCall(deleteTagObj,reqParams).subscribe((res:any)=>{
      if(res){
        this.deleteBtnDissable = false;
        this.commonService.modalOpenMethod(res.message);
        this.getTagList();
      }else{
        this.deleteBtnDissable = false;
        this.commonService.modalOpenMethod("Something wents wrong at Tag delete");
      }
    },
    (error) => {
      this.deleteBtnDissable = false;
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
