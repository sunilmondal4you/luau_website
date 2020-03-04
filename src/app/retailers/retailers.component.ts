import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { TokenService } from './../token.service';
import { CommonService } from './../common.service';
import { globalVars } from './../global';
import * as _underscore from 'underscore';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent implements OnInit {

  public userData:any = {};
  loaderStart = false;
  submitted = false;
  formSubmitted = false;
  pageSize = 20;
  page = 0;

  pager: any = {};
  allItemLen: any;
  firstSearchCall = false;

  RETAILER_LIST = [];
  reindexBtnDissable=false;
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
    this.userData.userDetail.retailerPage = this.userData.userDetail.retailerPage || 0;
    if(!globalVars.refresh_token){
      this.tokenService.tokenPostCall(function(){ref.ngOnInit();});
    }else{
      this.getRetailerList();
    }
  };

  onResize(event) {
    /* Calculate RetailerList section hieght */
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
     }, 500);
  };

  getRetailerList(){
    let ref = this;
    this.submitted = false;
    this.loaderStart = true;
    let retailerListReqObj = {
      "apiExt"  : 'v1/retailers?size='+this.pageSize+'&page='+this.userData.userDetail.retailerPage,
      "access_token"   : globalVars.access_token,
    }
    let reqParams = {
      "size"    : this.pageSize,
      "page"    : this.userData.userDetail.retailerPage,
    };
    this.apiService.olympusmonsGetApiCall(retailerListReqObj, reqParams).then((res:any)=>{  
      if(res){
        this.firstSearchCall = false;
        this.RETAILER_LIST = res.content || [];
        this.RETAILER_LIST.sort((a, b)=> {return <any>new Date(b.lastReindexedAt) - <any>new Date(a.lastReindexedAt)})
        this.allItemLen = res.paging.totalElements;
        this.setPage((this.userData.userDetail.retailerPage + 1) || 1);
        this.loaderStart = false;
        this.calculateCardHieght()
        
      }else{
        this.loaderStart = false;
        this.calculateCardHieght()
      }
    },
    (error) => {
      this.loaderStart = false;
      this.calculateCardHieght();
    });
  };

  reindexConfirmation(item: any) {
    if(!this.reindexBtnDissable){
      this.reindexBtnDissable = true;
      this.dialogRef.closeAll();
      let message = "Are you sure you want to reindex-" + item.name;
      this.commonService.openDialog(message).subscribe((res: any) => {
        if (res) {          
          setTimeout(() => {
            this.reindexBtnDissable = false;
          }, 20000);       
          this.reIndexRetailer(item)
        }else{
          this.reindexBtnDissable = false;
        }
      },
      (error) => { });
    }
  };

  reIndexRetailer(item){
    let ref = this;
    let reindexReqObj = {
      "apiExt"       : 'admin/v1/ingest/products/reindex?retailerId='+item.id+'&actionName='+'REINDEX_RETAILER',
      "access_token" : globalVars.access_token,
    }
    let reqParams = {
      "retailerId"   : item.id,
      "actionName"   : "REINDEX_RETAILER",
    };
    this.apiService.olympusmonsGetApiCall(reindexReqObj, reqParams).then((res:any)=>{  
      if(res){
        if(res.message)
          this.displayReindexMsg(res);
        this.loaderStart = false;
        this.getRetailerList(); 
      }else{
        this.loaderStart = false;
        this.calculateCardHieght();
      }
    },
    (error) => {
      this.loaderStart = false;
      this.calculateCardHieght();
    });
  };

  displayReindexMsg(res){
    if(res.message == 'REINDEX_REQUEST_SENT_TO_QUEUE')
      this.tokenService.modalOpenMethod("Re-index request sent to the queue");
    else if(res.message == 'DUPLICATE_REINDEX_REQUEST')
      this.tokenService.modalOpenMethod("Duplicate re-index request");
    else if(res.message == 'REINDEXING_IS_INPROGRESS')
      this.tokenService.modalOpenMethod("Reindexing is in progress");
    else
      this.tokenService.modalOpenMethod(res.message);
  }

  setPage(retailerPage: number) {
    if (retailerPage < 1 || retailerPage > this.pager.totalPages) {
      return;
    }
    if (this.userData.userDetail.retailerPage != retailerPage - 1) {
      this.userData.userDetail.retailerPage = retailerPage - 1;
      this.getRetailerList();
      localStorage.setItem('userObj', JSON.stringify(this.userData));
    }
    this.pager = this.commonService.getPager(this.allItemLen, retailerPage, this.pageSize);
  };
}
