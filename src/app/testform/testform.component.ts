import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestformComponent implements OnInit {
  testForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.testForm = this.formBuilder.group({
          name: ['', Validators.required],
          street: ['', Validators.required],
          number: ['', [Validators.required, Validators.email]],
          email: ['', Validators.required],
          // agreement: [  , Validators.required],
      })
  }

  submitForm(): void {
      const { agreement } = this.testForm.controls;

      if (this.testForm.valid) {

          this.testForm.reset();
      } else {
          // this.testErrors();
      }
  }

  testErrors() {
      const {
          name,
          street,
          number,
          email,
      } = this.testForm.controls;

      if (!name.value) {
          name.setErrors({
              noValue: true
          });
      }
      if (!street.value) {
          street.setErrors({
              noValue: true
          });
      }
      if (!number.value) {
          number.setErrors({
              noValue: true
          });
      }
      if (!email.value) {
          email.setErrors({
              noValue: true
          });
      }
  }
}
