import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  inqiriesForm: FormGroup;
  submitted = false;
  public userData:any = {};

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userObj")); 

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
      let inquiriesObj = {
        "name"        : this.inqiriesForm.value.name,
        "email"       : this.inqiriesForm.value.email,
        "piece_details": this.inqiriesForm.value.details,
        "company_name": this.inqiriesForm.value.company_name,
        "apiExt"      : "press_inquiries.php",
        "authToken"   : "",
      };

      this.apiService.customPostApiCall(inquiriesObj).then((res:any)=>{
        if(res && res.status == "success"){
          this.ngOnInit();
          this.submitted = false;
        }
      },
      (error) => {});
    }
  };

}
