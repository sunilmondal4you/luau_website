import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.dashboardForm = this.formBuilder.group({
      username:     ['', Validators.required],
      password:     ['', Validators.required],
    });
    console.log(this.apiService.orderPageView);
    this.apiService.setOrderPageView(true);
  }

  get f() { return this.dashboardForm.controls};

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if(this.dashboardForm.invalid) {
        return;
    }else{
      let brandObject = {
        "username"  : this.dashboardForm.value.username,
        "password"  : this.dashboardForm.value.password,
        "apiExt"    : "luauet-dashbord-login.php",
      };

      this.apiService.customPostApiCall(brandObject).subscribe((res:any)=>{
        if(res){
          // if(res.status == "success"){
          //   this.dashboardForm.reset();
          //   window.location.reload();
          // }
          alert(JSON.stringify(res));
        }else{
          alert("Something wents wrong.");
        }
      },
      (error) => alert(error.message));
    }

  };


}
