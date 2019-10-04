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
            var trackingDatakey = Object.keys(trackingDetailsObj.tracking_data)
            trackingDatakey.forEach(function (item) {
                if (item.indexOf(order.product_details.name) > -1) {
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

    updateLocalStorage() {
        this.userData.loggedIn = false;
        let updateReqObj = {
            "loggedIn": false,
            "userDetail": {},
        };
        let tempObj = {
            "loggedIn": false,
        }
        this.apiService.updateUserDetail(tempObj);
        this.userData = updateReqObj;
        localStorage.setItem('userObj', JSON.stringify(this.userData));
        this.router.navigate(['/dashboard']);
    }

    getUserOrderDetail() {
        if (this.userData && this.userData.loggedIn) {
            this.loaderStart = true;
            let OrderReqObj = {
                "page": this.userData.userDetail.page || 0,
                "user_id": this.userData.userDetail.user_id || 1,
                "token": this.userData.userDetail.token,
                "apiExt": "luauet-get-orders.php",
            }
            this.apiService.customPostApiCall(OrderReqObj).subscribe((res: any) => {
                if (res) {
                    this.loaderStart = false;
                    this.orderList = res.objects || [];
                    this.allItemLen = res.order_count;
                    this.pending_count = res.pending_count || 0;
                    this.setPage((this.userData.userDetail.page + 1) || 1);
                    // console.log(JSON.stringify(res));
                } else {
                    this.loaderStart = false;
                    this.commonService.modalOpenMethod("Something wents wrong on Order Call!");
                }
            },
                (error) => {
                    this.loaderStart = false;
                    if (error.status == 401) {
                        this.updateLocalStorage();
                    } else {
                        this.commonService.modalOpenMethod(error.message);
                    }
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

            this.apiService.customPostApiCall(searchObj).subscribe((res: any) => {
                if (res) {
                    if (res.objects) {
                        this.orderList = res.objects || [];
                        this.allItemLen = undefined;
                    }
                } else {
                    this.commonService.modalOpenMethod("Something wents wrong.");
                }
            },
                (error) => {
                    if (error.status == 401) {
                        this.commonService.clearStorage("dashboard");
                    } else {
                        this.commonService.modalOpenMethod(error.message)
                    }
                });
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

    getCardLastFrorDigit(order: any) {
        let cardNum = order.order_details.payment_method.number;
        var cardLeng = cardNum.length;
        return cardNum.slice((cardLeng - 4), cardLeng);
    };

    setCardLogo(order: any) {
        // return "./assets/img/masterCard.png";
        let cardNum = order.order_details.payment_method.number;
        if (cardNum.startsWith("4")) {
            return "./assets/img/visaCard.png";
        } else if (cardNum.startsWith("34") || cardNum.startsWith("37")) {
            return "./assets/img/americanExpCard.png";
        } else if (cardNum.startsWith("51") || cardNum.startsWith("52") || cardNum.startsWith("53") || cardNum.startsWith("54") || cardNum.startsWith("55")) {
            return "./assets/img/masterCard.png";
        } else if (cardNum.startsWith("34") || cardNum.startsWith("37")) {
            return "./assets/img/discoverCard.png";
        } else {
            return "./assets/img/discoverCard.png";
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
        this.apiService.customPostApiCall(sendNotificationObj).subscribe((res: any) => {
            if (res) {
                selOrder.order_status = 'Cancelled';
                selOrder.order_placement_status = res.order_placement_status || '0';
                this.commonService.modalOpenMethod(res.message);
            } else {
                this.commonService.modalOpenMethod("Something wents wrong at order cancel");
            }
        },
            (error) => {
                if (error.status == 401) {
                    this.commonService.clearStorage("dashboard");
                } else {
                    this.commonService.modalOpenMethod(error.message);
                }
            });
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

}
