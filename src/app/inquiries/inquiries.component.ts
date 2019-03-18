import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  inqiriesForm: FormGroup;
  submitted = false;
  apiURL: string = 'http://192.168.1.29/luau-api/scripts/press_inquiries.php';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.inqiriesForm = this.formBuilder.group({
      name:        ['', Validators.required],
      comapny_name:['', Validators.required],
      details: ['', Validators.required],
    });
  };

  get f() { return this.inqiriesForm.controls};

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.inqiriesForm.invalid) {
        return;
    }else{
      let inquiriesObj = this.inqiriesForm.value;
      this.http.post(`${this.apiURL}`,inquiriesObj).subscribe(
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
