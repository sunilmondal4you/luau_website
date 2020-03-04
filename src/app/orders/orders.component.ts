import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import { globalVars } from './../global';
import { MatDialog } from '@angular/material';
import * as _underscore from 'underscore';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
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

    getCompleteTrackingData(order: any): String {
        let trackingDetailsObj: any = {};
        let trackingDataObj: any = {};

        trackingDetailsObj = order.product_details.tracking_details; 
        if (trackingDetailsObj.tracking_url) {       
            var trackingURLkey = Object.keys(trackingDetailsObj.tracking_url)
            //fetching tracking URL
            trackingURLkey.forEach(function (item) {
                if (item.indexOf(order.product_details.name) > -1) {
                    let trackingUrlObj = trackingDetailsObj.tracking_url[item];
                    order.trackingUrlDisp = trackingUrlObj || "";                
                }
            })
        }

        //fetching tracking history from tracking data
        if (trackingDetailsObj.tracking_data) {
            let exectMatchItem;
            let firstMatchItem;
            var trackingDatakey = Object.keys(trackingDetailsObj.tracking_data)
            trackingDatakey.forEach(function (item) {
                if(item == order.product_details.name){
                    exectMatchItem = item;
                }
                if (item.indexOf(order.product_details.name) > -1) {
                    if(!firstMatchItem){
                        firstMatchItem = item
                    }
                    item = exectMatchItem || firstMatchItem || item;
                    trackingDataObj = trackingDetailsObj.tracking_data[item];
                    if (trackingDataObj) {
                        order.trackingHistoryDisp = trackingDataObj;
                        if (trackingDataObj.tracking_history.length > 0) {
                            let latestStatus = trackingDataObj.tracking_history.length - 1;
                            order.statusDisp = (trackingDataObj.tracking_history[latestStatus].status || "");
                        }                        
                        return ""
                    } else {
                        return "";
                    }
                }
            })
        }
        this.selcOrderId1 = order.id;
        return "";
    };

    getUserOrderDetail() {
        if (this.userData && this.userData.loggedIn) {
            // this.loaderStart = true;
            let OrderReqObj = {
                "page": this.userData.userDetail.page || 0,
                "user_id": this.userData.userDetail.user_id || 1,
                "token": this.userData.userDetail.token,
                "apiExt": "luauet-get-orders.php",
            }
            this.apiService.customPostApiCall(OrderReqObj).then((res: any) => {
                if (res) {
                    this.loaderStart = false;
                    this.orderList = res.objects || [];
                    this.allItemLen = res.order_count;
                    this.pending_count = res.pending_count || 0;
                    this.setPage((this.userData.userDetail.page + 1) || 1);
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

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        if (this.userData.userDetail.page != page - 1) {
            this.userData.userDetail.page = page - 1
            this.getUserOrderDetail();
            localStorage.setItem('userObj', JSON.stringify(this.userData));
        }

        this.pager = this.commonService.getPager(this.allItemLen, page);
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

    orderCancel(selOrder: any) {
        this.dialogRef.closeAll();
        let message = "Are you sure you want to cancel order-" + selOrder.id
        this.commonService.openDialog(message).subscribe((res: any) => {
            if (res) {
                this.sendNotification(selOrder)
            }
        },
            (error) => { });
    };

    sendNotification(selOrder: any) {
        let sendNotificationObj = {
            "order_id": selOrder.id,
            "local_order_id": selOrder.local_order_id,
            "product_name": selOrder.product_details.name,
            "user_id": this.userData.userDetail.user_id,
            "token": this.userData.userDetail.token,
            "target_user_id": selOrder.user_id,
            "apiExt": "luauet-send-notifiaction.php",
        }
        this.apiService.customPostApiCall(sendNotificationObj).then((res: any) => {
            if (res) {
                selOrder.order_status = 'Cancelled';
                selOrder.order_placement_status = res.order_placement_status || '0';
            }
        },
        (error) => {});
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

    getDifferentialColor(product_details: any) {
        if (product_details.money_differential) {
            product_details.money_differential_disp = 0;
            if (product_details.money_differential > 0) {
                product_details.money_differential_disp = Math.abs(product_details.money_differential);
                return 'green';
            } else if (product_details.money_differential < 0) {
                product_details.money_differential_disp = Math.abs(product_details.money_differential);
                return 'red';
            }
        }
    };

    linkMerchantOrderIdDialog(selOrder:any){
        this.dialogRef.closeAll();

        let message = "Link Merchant Order Id"
        globalVars.LMOI = true;
        globalVars.flaggedInputData = {"merchant_order_id":selOrder.merchant_order_id || '', "status":selOrder.order_placed_status || "0"};
        let flaggedInputData = globalVars.flaggedInputData;
        this.commonService.flaggedInputDialog(message).subscribe((res:any)=>{
        let inputData:(any) = globalVars.flaggedInputData;
        if(inputData) {
            globalVars.LMOI = false;
            if(flaggedInputData.merchant_order_id != globalVars.flaggedInputData.merchant_order_id || flaggedInputData.status != globalVars.flaggedInputData.status)
                this.uploadMerchantOrderId(selOrder)
            else
                this.commonService.modalOpenMethod("Data must be different!")
        }
        },(error) => {});
        
    };

    uploadMerchantOrderId(selOrder){
        let searchObj = {
            "order_id"          : selOrder.id,
            "user_id"           : this.userData.userDetail.user_id,
            "token"             : this.userData.userDetail.token,
            "merchant_order_id" : globalVars.flaggedInputData.merchant_order_id,
            "status"            : globalVars.flaggedInputData.status,
            "apiExt"            : "luauet-save-placed-order.php",
        };
        this.apiService.customPostApiCall(searchObj).then((res: any) => {
            if (res && res.status) {
                this.getUserOrderDetail();
            }
        },
        (error) => {});
    }

}
