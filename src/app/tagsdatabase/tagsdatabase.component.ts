import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import {MatDialog} from '@angular/material';
import * as _underscore from 'underscore';

@Component({
  selector: 'app-tagsdatabase',
  templateUrl: './tagsdatabase.component.html',
  styleUrls: ['./tagsdatabase.component.css']
})
export class TagsdatabaseComponent implements OnInit {
  searchForm: FormGroup;
  public userData:any = {};
  loaderStart = false;
  orderList = [];
  pending_count = 0;
  selcOrderId1:any;
  selcOrderId2:any;
  selcOrderId3:any;
  public imgPathP = "./assets/img/product.png";

  pager: any = {};
  pagedItems: any[];
  allItemLen:any;

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

    this.searchForm = this.formBuilder.group({
      tag_name: ['', Validators.required],
    });
  }
  get f() { return this.searchForm.controls};

  clearSearchField(){
    this.searchForm = this.formBuilder.group({
      tag_name: ['', Validators.required],
    });
  };

  onSubmit() {
    if(this.searchForm.value.tag_name=="") {

    }else{
      let searchObj = {
        "user_id" : this.userData.userDetail.user_id,
        "order_id": this.searchForm.value.order_id,
        "token"   : this.userData.userDetail.token,
        "apiExt"  : "luauet-search-order.php",
      };

      this.apiService.customPostApiCall(searchObj).subscribe((res:any)=>{
        if(res){
          if(res.objects){
            this.orderList = res.objects || [];
            this.allItemLen = undefined;
          }
        }else{
          this.commonService.modalOpenMethod("Something wents wrong.");
        }
      },
      (error) => {
        if(error.status==401){
          this.commonService.clearStorage("dashboard");
        }else{
          this.commonService.modalOpenMethod(error.message)        }
      });
    }

  };

  

}
