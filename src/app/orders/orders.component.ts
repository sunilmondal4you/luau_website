import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';

import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';

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

  pager: any = {};
  pagedItems: any[];
  allItemLen:any;

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
    private commonService: CommonService,
    public dialog: MatDialog,
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

  orderCancel(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  };

}
