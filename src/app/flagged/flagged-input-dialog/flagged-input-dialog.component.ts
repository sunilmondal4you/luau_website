import { Component, Inject, OnInit, HostListener } from '@angular/core';
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
  flaggedInputForm:any= FormGroup;
  orders = globalVars.selProductDetail.product_details;
  public LMOI = globalVars.LMOI || false;
  public OEP = globalVars.OEP || false;
  private clickedInside = false;
  moiError:any;
  priceError: any;

  constructor(
    public dialogRef: MatDialogRef<FlaggedInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private apiService : ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    document.getElementsByTagName('html')[0].scrollTop=0;

    const reg = 'https?://.+';
    if(globalVars.LMOI){
      this.flaggedInputForm = this.formBuilder.group({
        merchant_order_id: ['',[Validators.pattern('^[a-zA-Z0-9# ]+$')]],
        price            : [null,[Validators.pattern('^[0-9.0-9]+$')]],
        status           : ['',Validators.required],
      });
    }else if(globalVars.OEP){
      this.flaggedInputForm = this.formBuilder.group({
        carrier          : ['',Validators.required],
        tracking_url     : ['', [Validators.required, Validators.pattern(reg)]],
        tracking_number  : ['',Validators.required],
      });
    }else{
      this.flaggedInputForm = this.formBuilder.group({
        price            : [null,[Validators.pattern('^[0-9.0-9]+$')]],
        carrier          : ['',Validators.required],
        tracking_url     : ['', [Validators.required, Validators.pattern(reg)]],
        tracking_number  : ['',Validators.required],
        merchant_order_id: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9# ]+$')]],
      });
    }

    if(globalVars.LMOI && globalVars.flaggedInputData){
      this.flaggedInputForm.value = globalVars.flaggedInputData;
      this.flaggedInputForm.controls['merchant_order_id'].setValue(globalVars.flaggedInputData.merchant_order_id);
      this.flaggedInputForm.controls['price'].setValue(globalVars.flaggedInputData.price);
      this.flaggedInputForm.controls['status'].setValue("1");
    }
    globalVars.flaggedInputData = {};
  };

  get f() { return this.flaggedInputForm.controls};

  @HostListener('click')
  clickInside() {
    this.clickedInside = true;
  }
  
  @HostListener('document:click')
  clickout() {
    if (!this.clickedInside) {
      globalVars.flaggedInputData.dialogSubmit = false;
    }
    this.clickedInside = false;
  }

  onDialogClose(): void {
    globalVars.flaggedInputData.dialogSubmit = false;
    this.dialogRef.close();
  };

  onSubmit() {
    // stop here if form is invalid
    if(this.flaggedInputForm.invalid && !globalVars.LMOI) {
      this.formisvalid= true
    }else if(globalVars.LMOI){
      this.moiChange('save')
    }else{
      globalVars.flaggedInputData = this.flaggedInputForm.value;
      this.dialogRef.close();
    }
  };

  moiChange(opt){
    this.moiError = undefined;
    this.priceError = undefined;
    if(!this.flaggedInputForm.value.merchant_order_id && this.flaggedInputForm.value.price){
      this.moiError = "Please insert Merchant order id";
      return;
    }else if(!this.flaggedInputForm.value.merchant_order_id){
      this.flaggedInputForm.controls['status'].setValue("0");
      this.flaggedInputForm.controls['price'].setValue("");
    }else if(this.flaggedInputForm.value.merchant_order_id && !this.flaggedInputForm.value.price && opt == 'save'){
      this.priceError = "Please insert Retailer Price";
      return;
    }
    globalVars.flaggedInputData = this.flaggedInputForm.value;
    globalVars.flaggedInputData.dialogSubmit = true;
    if(opt == 'save') this.dialogRef.close();
  }

}
