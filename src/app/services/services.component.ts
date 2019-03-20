import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicesForm: FormGroup;
  submitted = false;
  apiURL: string = 'http://192.168.1.29/luau-api/scripts/customer_service.php';


  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.servicesForm = this.formBuilder.group({
      name:    ['', Validators.required],
      email:   ['', [Validators.required, Validators.email]],
      order_id:['', Validators.required],
      details: ['', Validators.required],
    });
  };

  get f() { return this.servicesForm.controls};

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if(this.servicesForm.invalid) {
        return;
    }else{
      let config = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      let hashSalt = "#$%@SaltCreationForAuthentication#$%@"
      let hashkey = this.servicesForm.value.email + hashSalt;

      let servicesObj = {
        "name"     : this.servicesForm.value.name,
        "email"    : this.servicesForm.value.email,
        "order_id" : this.servicesForm.value.order_id,
        "details"  : this.servicesForm.value.details,
        "authToken": "",
      };

      servicesObj.authToken = sha512.sha512(hashkey);

      // this.apiService.customPostApiCall(servicesObj).subscribe((res:any)=>{
      //   this.servicesForm.reset();
      //     alert(res.message);
      // });
      
      this.http.post(`${this.apiURL}`,servicesObj,{ headers: config }).subscribe(
        (data : any)  => {
          if(data.status == "success"){
            this.servicesForm.reset();

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
