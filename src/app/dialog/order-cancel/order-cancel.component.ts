import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ApiService } from './../../api.service';
import { globalVars } from './../../global';

@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.component.html',
  styleUrls: ['./order-cancel.component.css']
})
export class OrderCancelComponent implements OnInit {

  form: FormGroup;
  orders = globalVars.selProductDetail.product_details;
  constructor(
    public dialogRef: MatDialogRef<OrderCancelComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private apiService : ApiService,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });

    this.addCheckboxes();
  }

  ngOnInit() {
    document.getElementsByTagName('html')[0].scrollTop=0
  }

  onDialogClose(): void {
    this.dialogRef.close();
  }

  

  private addCheckboxes() {
    this.orders.map((o, i) => {
      let control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }

  submit() {
    globalVars.selProductDetail;
    let selectedOrderIds = this.form.value.orders
    .map((v, i) => v ? this.orders[i].id : null)
    .filter(v => v !== null);
    console.log(selectedOrderIds);
    globalVars.selOrderId = selectedOrderIds;

    let selectedOrderName = this.form.value.orders
    .map((v, i) => v ? this.orders[i].name : null)
    .filter(v => v !== null);
    console.log(selectedOrderName);
  }

}
