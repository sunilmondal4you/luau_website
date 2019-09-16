import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from './../../api.service';
import { globalVars } from './../../global';

@Component({
  selector: 'app-flagged-input-dialog',
  templateUrl: './flagged-input-dialog.component.html',
  styleUrls: ['./flagged-input-dialog.component.css']
})
export class FlaggedInputDialogComponent implements OnInit {
  formisvalid = false;
  flaggedInputForm: FormGroup;
  orders = globalVars.selProductDetail.product_details;
  constructor(
    public dialogRef: MatDialogRef<FlaggedInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private apiService : ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    globalVars.flaggedInputData = {};

    document.getElementsByTagName('html')[0].scrollTop=0;

    const reg = 'https?://.+';
    this.flaggedInputForm = this.formBuilder.group({
      price            : [],
      carrier          : ['',Validators.required],
      tracking_url     : ['', [Validators.required, Validators.pattern(reg)]],
      tracking_number  : ['',Validators.required],
      merchant_order_id: ['',Validators.required],
    });
  };

  get f() { return this.flaggedInputForm.controls};

  onDialogClose(): void {
    this.dialogRef.close();
  };

  onSubmit() {
    // stop here if form is invalid
    if(this.flaggedInputForm.invalid) {
      this.formisvalid= true
    }else{
      globalVars.flaggedInputData = this.flaggedInputForm.value;
    }
  };

}
