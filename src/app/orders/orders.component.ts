import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import {MatDialog} from '@angular/material';
import * as _underscore from 'underscore';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
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

    this.getUserOrderDetail();

    this.searchForm = this.formBuilder.group({
      order_id: ['', Validators.required],
    });
  }
  get f() { return this.searchForm.controls};

  grtShippingStatus(product_details:any){
    if(product_details.tracking_details.tracking_data){
      let orderTrackingDetail = product_details.tracking_details.tracking_data[product_details.name];
      if(orderTrackingDetail){
        orderTrackingDetail.tracking_history = orderTrackingDetail.tracking_history.reverse();
        let latestStatus = orderTrackingDetail.tracking_history.length - 1;
        return orderTrackingDetail.tracking_history[latestStatus].status || "";
      }else{
        return "";
      }
    }
  };
  
  getUserOrderDetail(){
    this.loaderStart = true;
    let OrderReqObj = {
      "page" : this.userData.userDetail.page || 0,
      "user_id": this.userData.userDetail.user_id || 1,
      "token": this.userData.userDetail.token,
      "apiExt"    : "luauet-get-orders.php",
    }
    this.apiService.customPostApiCall(OrderReqObj).subscribe((res:any)=>{
      if(res){
        this.loaderStart = false;
        this.orderList = res.objects || [];
        this.allItemLen = res.order_count;
        this.pending_count = res.pending_count || 0;
        this.setPage((this.userData.userDetail.page+1) || 1);
        // console.log(JSON.stringify(res));
      }else{
        this.loaderStart = false;
        this.commonService.modalOpenMethod("Something wents wrong on Order Call!");
      }
    },
    (error) => {
      if(error.status==401){
        this.commonService.clearStorage("dashboard");
      }else{
        this.commonService.modalOpenMethod(error.message);
      }
    });
  };

  createProductUrl(order:any){
    let prodUrl = order.product_details.product_url;
    let out_encode = encodeURIComponent(prodUrl);
    let urlFormat = "txt";
    let urlLoc = encodeURIComponent("https://luauet.com");
    let urlKey = "bca470c3ce4d74a630fd09f488cc4d7a";

    let viglink_url = "http://api.viglink.com/api/click?out="+out_encode+"&loc="+urlLoc+"&key="+urlKey+"&format="+urlFormat;
    return viglink_url;
  };

  createTrackingUrl(order:any){
    if(order.product_details.tracking_details.tracking_url){
      let trackingUrlObj = JSON.parse(order.product_details.tracking_details.tracking_url);
      if(trackingUrlObj){
        return trackingUrlObj[order.product_details.name] || "";
      }
    }
  };

  clearSearchField(){
    this.searchForm = this.formBuilder.group({
      order_id: ['', Validators.required],
    });
    this.getUserOrderDetail();
  };

  onSubmit() {
    if(this.searchForm.value.order_id=="") {
      this.getUserOrderDetail();
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

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    if(this.userData.userDetail.page != page-1){
      this.userData.userDetail.page = page-1
      this.getUserOrderDetail();
      this.apiService.updateUserDetail(this.userData);
    }
    
    this.pager = this.apiService.getPager(this.allItemLen, page);
  };

  getCardLastFrorDigit(order:any){
    let cardNum = order.order_details.payment_method.number;
    var cardLeng = cardNum.length;
    return cardNum.slice((cardLeng-4), cardLeng);
  };

  setCardLogo(order:any){
    // return "./assets/img/masterCard.png";
    let cardNum = order.order_details.payment_method.number;
    if(cardNum.startsWith("4")){
      return "./assets/img/visaCard.png";
    }else if(cardNum.startsWith("34") || cardNum.startsWith("37")){
      return "./assets/img/americanExpCard.png";
    }else if(cardNum.startsWith("51") || cardNum.startsWith("52") || cardNum.startsWith("53") || cardNum.startsWith("54") || cardNum.startsWith("55")){
      return "./assets/img/masterCard.png";
    }else if(cardNum.startsWith("34") || cardNum.startsWith("37")){
      return "./assets/img/discoverCard.png";
    }else{
      return "./assets/img/discoverCard.png";
    }
  };

  orderCancel(selOrder:any){
    this.dialogRef.closeAll();
    let message = "Are you sure you want to cancel order-"+selOrder.id
    this.commonService.openDialog(message).subscribe((res:any)=>{
      if(res) {
        this.sendNotification(selOrder)
      }
    },
    (error) => {});
  };

  sendNotification(selOrder:any){
    let sendNotificationObj = {
      "order_id"      : selOrder.id,
      "local_order_id": selOrder.local_order_id,
      "product_name"  : selOrder.product_details.name,
      "user_id"       : this.userData.userDetail.user_id,
      "token"         : this.userData.userDetail.token,
      "target_user_id":selOrder.user_id,
      "apiExt"        : "luauet-send-notifiaction.php",
    }
    this.apiService.customPostApiCall(sendNotificationObj).subscribe((res:any)=>{
      if(res){
        selOrder.order_status = 'Cancelled';
        selOrder.order_placement_status = res.order_placement_status || '0';
        this.commonService.modalOpenMethod(res.message);
      }else{
        this.commonService.modalOpenMethod("Something wents wrong at order cancel");
      }
    },
    (error) => {
      if(error.status==401){
        this.commonService.clearStorage("dashboard");
      }else{
        this.commonService.modalOpenMethod(error.message);
      }
    });
  };

  positionByIndex(orderIndex:any){
    setTimeout(() => {
      if(orderIndex>3){  
        if(orderIndex==9){
          document.getElementsByTagName('html')[0].scrollTop=170;
        }else{
          document.getElementsByTagName('html')[0].scrollTop=70;
        }      
      }
      else{
        document.getElementsByTagName('html')[0].scrollTop=140;
      }
    }),100;
  };

  getDifferentialColor(product_details:any){
    if(product_details.money_differential){
      product_details.money_differential_disp = 0;
      if(product_details.money_differential>0)
        return 'green';
      else if(product_details.money_differential<0){
        product_details.money_differential_disp = Math.abs(product_details.money_differential);
        return 'red';
      }
    }
  };

}
