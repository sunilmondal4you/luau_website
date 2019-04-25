import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public userData = {};
  loaderStart = false;
  productCardView = false;
  addressCardView = false;
  orderList = [];
  selcProdDetail = {};
  trackingDetail = {};
  orderDetail = {};

  imgPath = ".././assets/img/modi.jpg";

  constructor(private apiService : ApiService,) { }

  ngOnInit() {
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
    });

    this.getUserOrderDetail(this.userData);
  }

  getUserOrderDetail(res:any){
    this.loaderStart = true;
    let OrderReqObj = {
      "page" : 1,
      "user_id": res.userDatail.user_id || 1,
      "token": res.userDatail.token,
      "apiExt"    : "luauet-get-orders.php",
    }
    this.apiService.customPostApiCall(OrderReqObj).subscribe((res:any)=>{
      if(res){
        this.loaderStart = false;
        this.orderList = res.objects || [];
        console.log(JSON.stringify(res));
      }else{
        this.loaderStart = false;
        alert("Something wents wrong on Order Call!");
      }
    },
    (error) => alert("Order call : "+error.message));
  };

  openProductCard(order:any){
    this.addressCardView = false;
    this.productCardView = !this.productCardView;
    this.selcProdDetail = order.product_details;
    this.trackingDetail = order.tracking_details;

  };
  openOrderDetailCard(order:any){
    this.productCardView = false;
    this.addressCardView = !this.addressCardView;
    this.orderDetail = order.order_details;
  };

}
