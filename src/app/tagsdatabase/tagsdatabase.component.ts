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
  page = 0;

  pager: any = {};
  allItemLen: any;
  firstSearchCall = false;

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
    let ref = this;
    this.loaderStart = true;

    this.userData = JSON.parse(localStorage.getItem("userObj")) || globalVars.userObj;
    this.userData.userDetail.tagPage = this.userData.userDetail.tagPage || 0;
    if(!globalVars.refresh_token){
      this.tokenService.tokenPostCall(function(){ref.ngOnInit();})
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

  getTagList(){
    let ref = this;
    this.submitted = false;
    this.loaderStart = true;
    let tagListReqObj = {
      "apiExt"  : 'v1/products-tags?size='+this.pageSize+'&page='+this.userData.userDetail.tagPage,
      "access_token"   : globalVars.access_token,
    }
    let reqParams = {
      "size"    : this.pageSize,
      "page"    : this.userData.userDetail.tagPage || 0,
    };
    this.apiService.olympusmonsGetApiCall(tagListReqObj, reqParams).then((res:any)=>{  
      if(res){
        this.firstSearchCall = false;
        this.TAG_LIST = res.content || [];
        this.allItemLen = res.paging.totalElements;
        this.setPage((this.userData.userDetail.tagPage + 1) || 1);
        this.calculateCardHieght()
        this.loaderStart = false;
      }else{
        this.calculateCardHieght()
        this.loaderStart = false;
      }

    },
    (error) => {
      this.calculateCardHieght();
      this.loaderStart = false;
    });
  };

  setPage(tagPage: number) {
    if (tagPage < 1 || tagPage > this.pager.totalPages) {
      return;
    }
    if (this.userData.userDetail.tagPage != tagPage - 1) {
      this.userData.userDetail.tagPage = tagPage - 1;
      if(this.searchForm.value.name)
        this.onTagSsearch()
      else
        this.getTagList();
      localStorage.setItem('userObj', JSON.stringify(this.userData));
    }
    this.pager = this.commonService.getPager(this.allItemLen, tagPage, this.pageSize);
  };

  clearSearchField(){
    this.submitted = false;
    this.searchForm.value.name = "";
    this.pager = {};
    this.userData.userDetail.tagPage = 0;
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.getTagList()
  };

  onTagSsearch() {
    let ref = this;
    if(!this.firstSearchCall){
      this.userData.userDetail.tagPage = 0
    }
    if(this.searchForm.value.name=="") {
      this.submitted = true;
      this.getTagList();
    }else{
      let searchObj = {
        "apiExt"  : 'v1/products-tags/search?tagName='+this.searchForm.value.name+'&size='+this.pageSize+'&page='+this.userData.userDetail.tagPage,
        "access_token"   : globalVars.access_token,
      }
      let reqParams = {
        "size"    : this.pageSize,
        "page"    : this.userData.userDetail.tagPage || 0,
      };
      this.apiService.olympusmonsGetApiCall(searchObj, reqParams).then((res:any)=>{
        if(res){      
          this.submitted = false;    
          this.TAG_LIST = res.content || [];
          this.firstSearchCall = true;
          this.allItemLen = res.paging.totalElements;
          this.setPage((this.userData.userDetail.tagPage + 1) || 1);
          this.loaderStart = false;
        }
      },
      (error) => {
        this.loaderStart = false;
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
        "access_token"    : globalVars.access_token,
        "apiExt"          : "v1/products-tags?",
      };
      createTagObj.luauTagSynonyms.push(synonymsObj);
      
      let reqParams = {
        "name"            : this.tagCreateForm.value.name.toString().trim(),
        "active"          : true,
        "luauTagSynonyms" : createTagObj.luauTagSynonyms,
      };
      this.apiService.olympusmonsPostApiCall(createTagObj,reqParams).then((res:any)=>{
        if(res){
          this.createBtnDissable = false;
          if(res.id){
            this.getTagList();
            this.tagCreateForm = this.formBuilder.group({
              name: ['', Validators.required],
              synonyms: [''],
            });

            this.commonService.modalOpenMethod("Tag created successfully");

            // this.ngOnInit();
            this.formSubmitted = false;
          }
        }else{
          this.createBtnDissable = false;
        }
      },
      (error) => {
        this.createBtnDissable = false;
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
      "access_token" : globalVars.access_token,
      "apiExt"       : "v1/products-tags/"+selTag.id,
    }
    let reqParams = {
      "tag-id": selTag.id,
    };
    this.apiService.olympusmonsDelApiCall(deleteTagObj,reqParams).then((res:any)=>{
      if(res){
        this.clearSearchField();
      }
      this.deleteBtnDissable = false;
    },
    (error) => {
      this.deleteBtnDissable = false;
    });
  };
  

}
