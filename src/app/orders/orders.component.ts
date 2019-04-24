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
        console.log(JSON.stringify(res));
      }else{
        this.loaderStart = false;
        alert("Something wents wrong on Order Call!");
      }
    },
    (error) => alert("Order call : "+error.message));
  };

  openProductCard(){

  }

}
