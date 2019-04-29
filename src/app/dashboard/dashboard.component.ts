import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup;
  submitted = false;
  public userData = {};

  constructor(
    private formBuilder : FormBuilder, 
    private apiService : ApiService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
    });

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
            alert(res.message);
          }
        }else{
          alert("Something wents wrong.");
        }
      },
      (error) => alert(error.message));
    }

  };

  updateUserDetail(res:any){
    let orderReqObj = {
      "loggedIn" : true,
      "userDetail":{
        "user_id"  : res.user_id || 1,
        "token": res.user_token,
      },
    }
    
    /** Update user data to services and Session Storage **/
    this.apiService.updateUserDetail(orderReqObj);
    sessionStorage.setItem('userObj', JSON.stringify(orderReqObj));

    this.router.navigate(['/orders']);
  };
}
