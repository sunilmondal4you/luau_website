import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import { globalVars } from './../global';
import { MatDialog } from '@angular/material';
import * as _underscore from 'underscore';

@Component({
  selector: 'app-flagged',
  templateUrl: './flagged.component.html',
  styleUrls: ['./flagged.component.css']
})
export class FlaggedComponent implements OnInit {

  searchForm: FormGroup;
  public userData: any = {};
  loaderStart = false;
  orderList = [];
  pending_count = 0;
  selcOrderId1: any;
  selcOrderId2: any;
  selcOrderId3: any;
  public imgPathP = "./assets/img/product.png";
  pager: any = {};
  pagedItems: any[];
  allItemLen: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private commonService: CommonService,
    private dialogRef: MatDialog,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userObj"));

    this.getUserOrderDetail();

    this.searchForm = this.formBuilder.group({
      order_id: ['', Validators.required],
    });
  }
  get f() { return this.searchForm.controls };

  getCompleteTrackingData(order: any): String {
    let trackingDetailsObj: any = {};
    let trackingDataObj: any = {};

    trackingDetailsObj = order.product_details.tracking_details; 
    if (trackingDetailsObj.tracking_url) {       
      var trackingURLkey = Object.keys(trackingDetailsObj.tracking_url)
      //fetching tracking URL
      trackingURLkey.forEach(function (item) {
        if (item.indexOf(order.product_details.name) > -1) {
          let trackingUrlObj = trackingDetailsObj.tracking_url[item];
          order.trackingUrlDisp = trackingUrlObj || "";                
        }
      })
    }

    //fetching tracking history from tracking data
    if (trackingDetailsObj.tracking_data) {
      var trackingDatakey = Object.keys(trackingDetailsObj.tracking_data)
      trackingDatakey.forEach(function (item) {
        if (item.indexOf(order.product_details.name) > -1) {
          trackingDataObj = trackingDetailsObj.tracking_data[item];
          if (trackingDataObj) {
            order.trackingHistoryDisp = trackingDataObj;
            if (trackingDataObj.tracking_history.length > 0) {
              let latestStatus = trackingDataObj.tracking_history.length - 1;
              order.statusDisp = (trackingDataObj.tracking_history[latestStatus].status || "");
            }                        
            return ""
          } else {
            return "";
          }
        }
      })
    }
    this.selcOrderId1 = order.id;
    return "";
  };

  updateLocalStorage() {
    this.userData.loggedIn = false;
    let updateReqObj = {
      "loggedIn": false,
      "userDetail": {},
    };
    let tempObj = {
      "loggedIn": false,
    }
    this.apiService.updateUserDetail(tempObj);
    this.userData = updateReqObj;
    localStorage.setItem('userObj', JSON.stringify(this.userData));
    this.router.navigate(['/dashboard']);
  }

  getUserOrderDetail() {
    if (this.userData && this.userData.loggedIn) {
      this.loaderStart = true;
      let OrderReqObj = {
        "page": this.userData.userDetail.flaggedPage || 0,
        "user_id": this.userData.userDetail.user_id || 1,
        "token": this.userData.userDetail.token,
        "apiExt": "luauet-get-pending-orders.php",
      }
      this.apiService.customPostApiCall(OrderReqObj).subscribe((res: any) => {
        if (res) {
          this.loaderStart = false;
          this.orderList = res.orders || [];
          this.allItemLen = res.order_count;
          this.pending_count = res.pending_count || 0;
          this.setPage((this.userData.userDetail.flaggedPage + 1) || 1);
          // console.log(JSON.stringify(res));
        } else {
          this.loaderStart = false;
          this.commonService.modalOpenMethod("Something wents wrong on Order Call!");
        }
      },
      (error) => {
        this.loaderStart = false;
        if (error.status == 401) {
          this.updateLocalStorage();
        } else {
          this.commonService.modalOpenMethod(error.message);
        }
      });
    } else {
      this.ngOnInit();
    }
  };

  createProductUrl(product: any) {
    if(product.product_url){
      let prodUrl = product.product_url;
      let out_encode = encodeURIComponent(prodUrl);
      let urlFormat = "txt";
      let urlLoc = encodeURIComponent("https://luauet.com");
      let urlKey = "bca470c3ce4d74a630fd09f488cc4d7a";

      let viglink_url = "http://api.viglink.com/api/click?out=" + out_encode + "&loc=" + urlLoc + "&key=" + urlKey + "&format=" + urlFormat;
      return viglink_url;
    }
  };

  clearSearchField() {
    this.searchForm = this.formBuilder.group({
      order_id: ['', Validators.required],
    });
    this.getUserOrderDetail();
  };

  onSubmit() {
    if (this.searchForm.value.order_id == "") {
      this.getUserOrderDetail();
    } else {
      let searchObj = {
        "user_id": this.userData.userDetail.user_id,
        "order_id": this.searchForm.value.order_id,
        "token": this.userData.userDetail.token,
        "apiExt": "luauet-search-order.php",
      };

      this.apiService.customPostApiCall(searchObj).subscribe((res: any) => {
        if (res) {
          if (res.orders) {
            this.orderList = res.orders || [];
            this.allItemLen = undefined;
          }
        } else {
          this.commonService.modalOpenMethod("Something wents wrong.");
        }
      },
      (error) => {
        if (error.status == 401) {
          this.commonService.clearStorage("dashboard");
        } else {
          this.commonService.modalOpenMethod(error.message)
        }
      });
    }

  };

  setPage(flaggedPage: number) {
    if (flaggedPage < 1 || flaggedPage > this.pager.totalPages) {
      return;
    }

    if (this.userData.userDetail.flaggedPage != flaggedPage - 1) {
      this.userData.userDetail.flaggedPage = flaggedPage - 1
      this.getUserOrderDetail();
      localStorage.setItem('userObj', JSON.stringify(this.userData));
    }

    this.pager = this.commonService.getPager(this.allItemLen, flaggedPage);
  };

  getCardLastFourDigit(order: any) {
    let cardNum = order.order_data.payment_method.number;
    var cardLeng = cardNum.length;
    return cardNum.slice((cardLeng - 4), cardLeng);
  };

  setCardLogo(order: any) {
    // return "./assets/img/masterCard.png";
    let cardNum = order.order_data.payment_method.number;
    if (cardNum.startsWith("4")) {
      return "./assets/img/visaCard.png";
    } else if (cardNum.startsWith("34") || cardNum.startsWith("37")) {
      return "./assets/img/americanExpCard.png";
    } else if (cardNum.startsWith("51") || cardNum.startsWith("52") || cardNum.startsWith("53") || cardNum.startsWith("54") || cardNum.startsWith("55")) {
      return "./assets/img/masterCard.png";
    } else if (cardNum.startsWith("34") || cardNum.startsWith("37")) {
      return "./assets/img/discoverCard.png";
    } else {
      return "./assets/img/discoverCard.png";
    }
  };

  positionByIndex(orderIndex: any) {
    setTimeout(() => {
      if (orderIndex > 3) {
        if (orderIndex == 9) {
          document.getElementsByTagName('html')[0].scrollTop = 170;
        } else {
          document.getElementsByTagName('html')[0].scrollTop = 70;
        }
      }
      else {
        document.getElementsByTagName('html')[0].scrollTop = 140;
      }
    }), 100;
  };
  
  openFlaggedInputDialog(selOrder:any){
    this.dialogRef.closeAll();
    let message = "Upload Tracking Details"
    this.commonService.flaggedInputDialog(message).subscribe((res:any)=>{
      let inputData:(any) = globalVars.flaggedInputData;
      if(inputData && inputData.tracking_url && inputData.tracking_number && inputData.merchant_order_id && inputData.carrier) {
        this.uploadFlaggedData(selOrder)
      }
    },(error) => {});
  };

  uploadFlaggedData(selOrder){
    let price = 0
    if(selOrder.order_data.grand_total_price)
      price = Number(selOrder.order_data.grand_total_price)
    
    let searchObj = {
      "order_id"          : selOrder.id,
      "user_id"           : this.userData.userDetail.user_id,
      "token"             : this.userData.userDetail.token,
      "price"             : globalVars.flaggedInputData.price || price,
      "carrier"           : globalVars.flaggedInputData.carrier,
      "tracking_url"      : globalVars.flaggedInputData.tracking_url,
      "tracking_number"   : globalVars.flaggedInputData.tracking_number,
      "merchant_order_id" : globalVars.flaggedInputData.merchant_order_id,
      "apiExt"            : "luauet-pending-order-insert-update.php",
    };
    this.apiService.customPostApiCall(searchObj).subscribe((res: any) => {
      if (res) {
        if (res.status) {
          this.commonService.modalOpenMethod(res.message);
          this.getUserOrderDetail();
        }
      } else {
        this.commonService.modalOpenMethod("Something wents wrong.");
      }
    },
    (error) => {
      if (error.status == 401) {
        this.commonService.clearStorage("dashboard");
      } else {
        this.commonService.modalOpenMethod(error.message)
      }
    });
  }

}
