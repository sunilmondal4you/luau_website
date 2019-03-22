import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  inqiriesForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService,
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
      let inquiriesObj = {
        "name"        : this.inqiriesForm.value.name,
        "email"       : this.inqiriesForm.value.email,
        "details"     : this.inqiriesForm.value.details,
        "company_name": this.inqiriesForm.value.company_name,
        "apiExt"      : "press_inquiries.php",
        "authToken"   : "",
      };

      this.apiService.customPostApiCall(inquiriesObj).subscribe((res:any)=>{
        if(res){
          if(res.status == "success"){
            this.inqiriesForm.reset();
            window.location.reload();
          }
          alert(res.message);
        }else{
          alert("Something wents wrong.");
        }
      },
      (error) => alert(error.message));
    }
  };

}
