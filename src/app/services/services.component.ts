import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicesForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
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
      let servicesObj = {
        "name"     : this.servicesForm.value.name,
        "email"    : this.servicesForm.value.email,
        "order_id" : this.servicesForm.value.order_id,
        "query_details": this.servicesForm.value.details,
        "apiExt"   : "customer_service.php",
        "authToken": "",
      };

      this.apiService.customPostApiCall(servicesObj).subscribe((res:any)=>{
        if(res){
          if(res.status == "success"){
            this.servicesForm.reset();
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
