import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  searchForm: FormGroup;
  public userData:any = {};
  loaderStart = false;
  orderList = [];
  selcOrderId1:any;
  selcOrderId2:any;
  public imgPathP = "./assets/img/product.png";

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
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

  getUserOrderDetail(){
    this.loaderStart = true;
    let OrderReqObj = {
      "page" : 0,
      "user_id": this.userData.userDetail.user_id || 1,
      "token": this.userData.userDetail.token,
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

  onSubmit() {
    if(this.searchForm.value.order_id=="" && this.orderList.length>1) {
      this.getUserOrderDetail();
    }else{
      let searchObj = {
        "page"    : 0,
        "user_id" : this.userData.userDetail.user_id,
        "order_id": this.searchForm.value.order_id,
        "token"   : this.userData.userDetail.token,
        "apiExt"  : "luauet-search-order.php",
      };

      this.apiService.customPostApiCall(searchObj).subscribe((res:any)=>{
        if(res){
          if(res.status == "success"){
            this.orderList = res.objects || [];
          }
        }else{
          alert("Something wents wrong.");
        }
      },
      (error) => alert(error.message));
    }

  };


}
