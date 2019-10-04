import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import { globalVars } from './../global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup;
  submitted = false;
  public userData:any = {};

  constructor(
    private formBuilder : FormBuilder, 
    private apiService : ApiService,
    private router : Router,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userObj"));
    if(this.userData && this.userData.loggedIn){
      this.router.navigate(['/orders']);
    }

    this.dashboardForm = this.formBuilder.group({
      username:     ['', Validators.required],
      password:     ['', Validators.required],
    });
  }

  get f() { return this.dashboardForm.controls};

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if(this.dashboardForm.invalid) {
        return;
    }else{
      let reqObj = {
        "username"  : this.dashboardForm.value.username,
        "password"  : this.dashboardForm.value.password,
        "apiExt"    : "luauet-dashbord-login.php",
      };

      this.apiService.customPostApiCall(reqObj).subscribe((res:any)=>{
        if(res){
          if(res.status == "success"){
            this.updateUserDetail(res);
          }else{
            this.commonService.modalOpenMethod(res.message);
          }
        }else{
          this.commonService.modalOpenMethod("Something wents wrong.");
        }
      },
      (error) => {
        if(error.status==401){
          this.commonService.clearStorage("dashboard");
        }else{
          this.commonService.modalOpenMethod(error.message)
        }
      });
    }

  };

  updateUserDetail(res:any){
    let orderReqObj = {
      "loggedIn" : true,
      "userDetail":{
        "page" : 0,
        "user_id"  : res.user_id || 1,
        "token": res.user_token,
      },
    };
    
    /** Update user data to services and Session Storage **/
    globalVars.userObj = orderReqObj;
    localStorage.setItem('userObj', JSON.stringify(orderReqObj));
    let tempObj = {
      loggedIn : true,
    }
    this.apiService.updateUserDetail(tempObj);

    this.router.navigate(['/orders']);
  };
}
