import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';

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
  selcOrderId1:any;
  selcOrderId2:any;
  selcOrderId3:any;
  public imgPathP = "./assets/img/product.png";
  // imgURL = "data:image/jpeg;base64,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"
  imgURL = "http://krisons.co.in/Images/admin.png"

  pager: any = {};
  pagedItems: any[];
  allItemLen:any;

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
    private commonService: CommonService,
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
        this.setPage((this.userData.userDetail.page+1) || 1);
        console.log(JSON.stringify(res));
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
  }

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

}
