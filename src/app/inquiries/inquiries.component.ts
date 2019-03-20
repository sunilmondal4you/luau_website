import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  inqiriesForm: FormGroup;
  submitted = false;
  apiURL: string = 'http://dev.api.luauet.com/luau-api/scripts/press_inquiries.php';

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.inqiriesForm = this.formBuilder.group({
      name:        ['', Validators.required],
      email:       ['', [Validators.required, Validators.email]],
      details:     ['', Validators.required],
      company_name:['', Validators.required],
    });
  };

  get f() { return this.inqiriesForm.controls};

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if(this.inqiriesForm.invalid) {
        return;
    }else{
      let config = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      let hashSalt = "#$%@SaltCreationForAuthentication#$%@"
      let hashkey = this.inqiriesForm.value.email + hashSalt;

      let inquiriesObj = {
        "name"        : this.inqiriesForm.value.name,
        "email"       : this.inqiriesForm.value.email,
        "details"     : this.inqiriesForm.value.details,
        "company_name": this.inqiriesForm.value.company_name,
        "authToken"   : "",
      };

      inquiriesObj.authToken = sha512.sha512(hashkey);

      this.http.post(`${this.apiURL}`,inquiriesObj,{ headers: config }).subscribe(
        (data : any)  => {
          if(data.status == "success"){
            this.inqiriesForm.reset();

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
