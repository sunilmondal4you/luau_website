import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brandSignupForm: FormGroup;
  submitted = false;
  apiURL: string = 'http://dev.api.luauet.com/luau-api/scripts/brand_signup.php';

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
  ) { };

  ngOnInit() {
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
      let config = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      let hashSalt = "#$%@SaltCreationForAuthentication#$%@"
      let hashkey = this.brandSignupForm.value.email + hashSalt;

      let brandObject = {
        "name"        : this.brandSignupForm.value.name,
        "email"       : this.brandSignupForm.value.email,
        "role"        : this.brandSignupForm.value.role,
        "message"     : this.brandSignupForm.value.message,
        "company_name": this.brandSignupForm.value.company_name,
        "authToken"   : "",
      };

      brandObject.authToken = sha512.sha512(hashkey);

      this.http.post(`${this.apiURL}`,brandObject,{ headers: config }).subscribe(
        (data : any)  => {
          if(data.status == "success"){
            this.brandSignupForm.reset();

            alert(data.message);
          }
        },
        (error :any)  => {
          if(error.status == "error"){
            alert(error.message);
          }
        }
      );
    }

  };

}
