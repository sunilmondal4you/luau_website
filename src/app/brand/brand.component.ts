import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brandSignupForm: FormGroup;
  submitted = false;
  apiURL: string = 'http://192.168.1.29/luau-api/scripts/brand_signup.php';

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient) { };

  ngOnInit() {
    this.brandSignupForm = this.formBuilder.group({
      name:         ['', Validators.required],
      company_name: ['', Validators.required],
      role:         ['', Validators.required],
      message:      ['', Validators.required],
    });
  };

  get f() { return this.brandSignupForm.controls};

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.brandSignupForm.invalid) {
        return;
    }else{
      let barndObject = this.brandSignupForm.value;
      this.http.post(`${this.apiURL}`,barndObject).subscribe(
        data  => {
          console.log("POST Request is successful ", data);
        },
        error  => {
          console.log("Error", error);
        }
      );
    }

  };

}
