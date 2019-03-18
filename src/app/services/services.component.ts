import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicesForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.servicesForm = this.formBuilder.group({
      userName:    ['', Validators.required],
      orderDetail: ['', Validators.required],
      helpDetail:  ['', Validators.required],
    });
  };

  get f() { return this.servicesForm.controls};

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.servicesForm.invalid) {
        return;
    }

    // alert('Submitted Successfully!');
  };

}
