import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import { globalVars } from './../global';
import { MatDialog } from '@angular/material';
import * as _underscore from 'underscore';

@Component({
    selector: 'app-returns',
    templateUrl: './returns.component.html',
    styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {

    searchForm: FormGroup;
    public userData: any = {};
    loaderStart = false;
    orderList = [];
    pending_count = 0;
    selcOrderId1: any;
    selcOrderId2: any;
    selcOrderId3: any;
    public imgPathP = "./assets/img/product.png";

    pager: any = {};
    pagedItems: any[];
    allItemLen: any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private apiService: ApiService,
        private commonService: CommonService,
        private dialogRef: MatDialog,
    ) { }

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem("userObj"));

        this.getUserOrderDetail();

        this.searchForm = this.formBuilder.group({
            order_id: ['', Validators.required],
        });
    }
    get f() { return this.searchForm.controls };

    getUserOrderDetail() {
        if (this.userData && this.userData.loggedIn) {
            this.loaderStart = true;
            let OrderReqObj = {
                "page": this.userData.userDetail.returnPage || 0,
                "user_id": this.userData.userDetail.user_id || 1,
                "token": this.userData.userDetail.token,
                "apiExt": "luauet-get-return-orders.php",
            }
            this.apiService.customPostApiCall(OrderReqObj).then((res: any) => {
                if (res) {
                    this.loaderStart = false;
                    this.orderList = res.objects || [];
                    this.allItemLen = res.order_count;
                    this.pending_count = res.pending_count || 0;
                    this.setPage((this.userData.userDetail.returnPage + 1) || 1);
                    // console.log(JSON.stringify(res));
                } else {
                    this.loaderStart = false;
                }
            },
            (error) => {
                this.loaderStart = false;
            });
        } else {
            this.ngOnInit();
        }
    };

    createProductUrl(order: any) {
        let prodUrl = order.product_details.product_url;
        let out_encode = encodeURIComponent(prodUrl);
        let urlFormat = "txt";
        let urlLoc = encodeURIComponent("https://luauet.com");
        let urlKey = "bca470c3ce4d74a630fd09f488cc4d7a";

        let viglink_url = "http://api.viglink.com/api/click?out=" + out_encode + "&loc=" + urlLoc + "&key=" + urlKey + "&format=" + urlFormat;
        return viglink_url;
    };

    clearSearchField() {
        this.searchForm = this.formBuilder.group({
            order_id: ['', Validators.required],
        });
        this.getUserOrderDetail();
    };

    onSubmit() {
        if (this.searchForm.value.order_id == "") {
            this.getUserOrderDetail();
        } else {
            let searchObj = {
                "user_id": this.userData.userDetail.user_id,
                "order_id": this.searchForm.value.order_id,
                "token": this.userData.userDetail.token,
                "apiExt": "luauet-search-order.php",
            };

            this.apiService.customPostApiCall(searchObj).then((res: any) => {
                if (res && res.objects) {
                    this.orderList = res.objects || [];
                    this.allItemLen = undefined;
                }
            },
            (error) => {});
        }

    };

    setPage(returnPage: number) {
        if (returnPage < 1 || returnPage > this.pager.totalPages) {
            return;
        }

        if (this.userData.userDetail.returnPage != returnPage - 1) {
            this.userData.userDetail.returnPage = returnPage - 1
            this.getUserOrderDetail();
            localStorage.setItem('userObj', JSON.stringify(this.userData));
        }

        this.pager = this.commonService.getPager(this.allItemLen, returnPage);
    };

    setCardLogo(order: any) {
        let payment_method = order.order_details.payment_method;
        if( payment_method && payment_method.brand){
            if (payment_method.brand == "visa") {
                return "./assets/img/visaCard.png";
            } else if (payment_method.brand == "amex") {
                return "./assets/img/americanExpCard.png";
            } else if (payment_method.brand == "mastercard") {
                return "./assets/img/masterCard.png";
            } else if (payment_method.brand == "discover") {
                return "./assets/img/discoverCard.png";
            } else {
                return "./assets/img/discoverCard.png";
            }
        }
    };

    positionByIndex(orderIndex: any) {
        setTimeout(() => {
            if (orderIndex > 3) {
                if (orderIndex == 9) {
                    document.getElementsByTagName('html')[0].scrollTop = 170;
                } else {
                    document.getElementsByTagName('html')[0].scrollTop = 70;
                }
            }
            else {
                document.getElementsByTagName('html')[0].scrollTop = 140;
            }
        }), 100;
    };

}
