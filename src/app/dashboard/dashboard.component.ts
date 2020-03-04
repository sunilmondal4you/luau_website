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

      this.apiService.customPostApiCall(reqObj).then((res:any)=>{
        if(res && res.status == "success"){
          this.commonService.updateUserDetailOnLogin(res);
        }
      },
      (error) => {});
    }

  };
}
