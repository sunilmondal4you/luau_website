import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brandSignupForm: FormGroup;
  submitted = false;
  public userData:any = {};

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService,
    private commonService: CommonService,
  ) { };

  ngOnInit() {
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
    });

    this.brandSignupForm = this.formBuilder.group({
      name:         ['', Validators.required],
      email:        ['', [Validators.required, Validators.email]],
      role:         ['', Validators.required],
      message:      ['', Validators.required],
      company_name: ['', Validators.required],
    });
  };

  get f() { return this.brandSignupForm.controls};

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if(this.brandSignupForm.invalid) {
        return;
    }else{
      let brandObject = {
        "name"        : this.brandSignupForm.value.name,
        "email"       : this.brandSignupForm.value.email,
        "role"        : this.brandSignupForm.value.role,
        "message"     : this.brandSignupForm.value.message,
        "company_name": this.brandSignupForm.value.company_name,
        "apiExt"      : "brand_signup.php",
        "authToken"   : "",
      };

      this.apiService.customPostApiCall(brandObject).subscribe((res:any)=>{
        if(res){
          if(res.status == "success"){
            this.ngOnInit();
            this.submitted = false;
          }
          this.commonService.modalOpenMethod(res.message);
        }else{
          this.commonService.modalOpenMethod("Something wents wrong.");
        }
      },
      (error) => {
        if(error.status==401){
          this.commonService.clearStorage("home");
        }else{
          this.commonService.modalOpenMethod(error.message)
        }
      });
    }

  };

}
