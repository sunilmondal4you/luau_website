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
  public orderList = [];
  selcOrderId1:any;
  selcOrderId2:any;
  public imgPathP = "./assets/img/product.png";

  pager: any = {};
  pagedItems: any[];
  allItemLen:any;

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
        alert("Something wents wrong on Order Call!");
      }
    },
    (error) => alert("Order call : "+error.message));
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
          this.orderList = res.objects || [];
          console.log(JSON.stringify(res));
        }else{
          alert("Something wents wrong.");
        }
      },
      (error) => alert(error.message));
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
}

}
