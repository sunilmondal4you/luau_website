import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import { globalVars } from './../global';
import { MatDialog } from '@angular/material';
import * as _underscore from 'underscore';

import * as _moment from 'moment';
const moment = _moment;

@Component({
	selector: 'app-order-dashboard',
	templateUrl: './order-dashboard.component.html',
	styleUrls: ['./order-dashboard.component.css'],
    animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('1000ms ease-in-out')),
      transition('out => in', animate('1000ms ease-in-out'))
    ]),
  ]
})
export class OrderDashboardComponent implements OnInit {

	searchForm: FormGroup;
    public userData: any = {};
    loaderStart = false;
    orderList = [];
    pending_count = 0;
    selcOrderDetailId: any;
    selcProdSecId: any;
    public imgPathP = "./assets/img/product.png";
    pager: any = {};
    pagedItems: any[];
    allItemLen: any;

    filters: any;
    filterdObj: any = {};
    selcOrder: any = {};
    filterData : any = {};
    dispMainMenu = false;
    clildSupportView = false;
    childNavigation = false;

    flaggedPage = false;
    open_case = false;

    leftCenterHt = 0;
    midCenterHt = 0;
    trackingHistoryHt = 0;

    menuState:string = 'out';
    fromDate:any; 

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private apiService: ApiService,
        private commonService: CommonService,
        private dialogRef: MatDialog,
    ) { }

    calculateHieght(){
        setTimeout(()=>{ 
            let wh = window.innerHeight;
            if(!this.dispMainMenu && this.dispMainMenu != undefined){
                let leftTopHt = document.getElementById('leftTop').offsetHeight;
                let leftBottomHt = document.getElementById('leftBottom').offsetHeight;
                this.leftCenterHt = (wh-leftTopHt-leftBottomHt);
            }
            let midTopHt = document.getElementById('midTop').offsetHeight;
            let MidBottomHt = (this.allItemLen && this.allItemLen>10) ? document.getElementById('midBottom').offsetHeight : 45;
            this.midCenterHt = (wh-midTopHt-MidBottomHt);

             if(this.selcOrder.trackingHistoryDisp && this.selcOrder.trackingHistoryDisp.tracking_history.length > 0){
                let rightTopHt = document.getElementById('rightTop').offsetHeight;
                this.trackingHistoryHt = (wh-rightTopHt);
            }
        }, 100);
    };

    ngOnInit() {
        this.filterdObj.showStatus = true;
        this.userData = JSON.parse(localStorage.getItem("userObj"));

        setTimeout(() => { this.getOrderDetail()});
        

        this.searchForm = this.formBuilder.group({
            order_id: ['', Validators.required],
        });
    }
    get f() { return this.searchForm.controls };

    getCompleteTrackingData(order: any): String {
        let trackingDetailsObj: any = {};
        let trackingDataObj: any = {};

        trackingDetailsObj = (order.product_details && order.product_details.tracking_details) ? order.product_details.tracking_details : {}; 
        if (trackingDetailsObj.tracking_url) {       
            var trackingURLkey = Object.keys(trackingDetailsObj.tracking_url)
            //fetching tracking URL
            trackingURLkey.forEach((item)=> {
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
            trackingDatakey.forEach((item)=> {
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
        this.selcProdSecId = order.id;
        this.calculateHieght();
        return "";
    };

    processAfterDataFetch(res){                  
        this.orderList = res.objects || [];
        this.allItemLen = res.order_count;
        this.pending_count = res.pending_count || 0;
        this.setPage((this.userData.userDetail.page + 1) || 1);

        if(res.objects.length){
            _underscore.find(res.objects, (item)=> {
                if(item.id == this.selcOrder.id){
                    item.changed_Order = true;
                    this.selcOrder = item;
                }
            })
            if(!this.selcOrder.changed_Order) this.selcOrder = this.orderList[0];
        }else{
            this.selcOrder = {}
        }
        this.getCompleteTrackingData(this.selcOrder);
        if(!this.filters) this.filters = res.filters;
        this.calculateHieght();
        this.loaderStart = false;
    };

    getOrderDetail() {
        if (this.userData && this.userData.loggedIn) {
            this.loaderStart = true;
            let OrderReqObj = {
                "page": this.userData.userDetail.page || 0,
                "user_id": this.userData.userDetail.user_id || 1,
                "token": this.userData.userDetail.token,
                "apiExt": "luauet-get-orders.php",
                "filter_flag": this.filters ? 0 : 1,
            }
            this.apiService.customPostApiCall(OrderReqObj).then((res: any) => {
                if (res) {
                    this.processAfterDataFetch(res);
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

    showHideChildLeftMenu():any{
        this.clildSupportView = false;
        this.dispMainMenu = !this.dispMainMenu;
        this.updateDasboardEvent();
        if(!this.clildSupportView && !this.childNavigation) this.calculateHieght();
    }
    updateDasboardEvent() {
        let obj = {loggedIn:true, dispMainMenu:this.dispMainMenu}
        this.apiService.updateUserDetail(obj);
    }
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
        this.onSubmit('searched');
    };

    selectdate(){
        this.childNavigation =  false;
        this.clildSupportView =  false;
        let dateVal = this.fromDate || null;
        this.filterData.date_from = dateVal ? moment(dateVal).format('YYYY-MM-DD') : '';
        this.filterData.date_from_disp = dateVal ? moment(dateVal).format('DD/MM') : '';

        this.onSubmit('searched');
    };

    searchByFilterOption(item, filterType){
        this.dispMainMenu = false;
        this.childNavigation =  false;
        this.clildSupportView = false;
        if(filterType=='status') this.filterData.status = (this.filterData.status != item) ? item : '';
        else if(filterType=='retailers') this.filterData.retailer = (this.filterData.retailer != item) ? item : '';
        else if(filterType=='sortBy') this.filterData.sort_by = (this.filterData.sort_by != item) ? item : '';

        if(filterType=='status' && this.filterData.status=='flagged'){
            this.open_case = false;
            this.childNavigation = true;
            this.flaggedPage = true;
        }else if(filterType=='open_case'){
            this.flaggedPage = false;
            this.childNavigation = true;
            this.open_case = true;
        }else{
            this.onSubmit('searched');
        }
    };

    filterReset(){
        this.filterData = {};
        this.searchForm = this.formBuilder.group({order_id: ['', Validators.required]});
        this.fromDate = null;
        this.filterdObj = {showStatus : true};
        this.childNavigation =  false;
        this.clildSupportView =  false;
        
        this.onSubmit('searched');
    };

    onSubmit(option:any) {
        if (option=='searched') this.userData.userDetail.page = 0;
        if (this.searchForm.value.order_id == "" && (!this.filterData || (!this.filterData.status && !this.filterData.retailer && !this.filterData.sort_by && !this.filterData.date_from))) {
            this.getOrderDetail();
        } else {
            let searchObj = {
                "status"   : this.filterData.status || '',
                "retailer" : this.filterData.retailer || '',
                "sort_by"  : this.filterData.sort_by || '',
                "date_from": this.filterData.date_from || '',
                "page"     : this.userData.userDetail.page || 0,
                "user_id"  : this.userData.userDetail.user_id,
                "order_id" : this.searchForm.value.order_id,
                "token"    : this.userData.userDetail.token,
                "apiExt"   : "luauet-search-order.php",
            };
             searchObj.order_id = searchObj.order_id.trim();
             if(searchObj.status != 'flagged'){
                this.loaderStart = true;
                this.apiService.customPostApiCall(searchObj).then((res: any) => {
                    if (res && res.objects) {
                        this.processAfterDataFetch(res);
                    }else{
                        this.loaderStart = false;
                    }
                },
                (error) => {this.loaderStart = false});
            }
        }
    };

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        if (this.userData.userDetail.page != page - 1) {
            this.userData.userDetail.page = page - 1
            this.onSubmit('pageChange');
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
        if(selOrder.merchant_order_id) return;
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
            if (orderIndex > 7) {
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
        globalVars.flaggedInputData = {"merchant_order_id":selOrder.merchant_order_id,"price":selOrder.retailer_price || "", "status":selOrder.order_placed_status || "0"};
        let flaggedInputData = globalVars.flaggedInputData;
        this.commonService.flaggedInputDialog(message).subscribe((res:any)=>{
        let inputData = globalVars.flaggedInputData;
        if(inputData.dialogSubmit && (inputData.merchant_order_id == '' || inputData.merchant_order_id)) {
            globalVars.LMOI = false;
            if(flaggedInputData.merchant_order_id != globalVars.flaggedInputData.merchant_order_id || flaggedInputData.status != globalVars.flaggedInputData.price || flaggedInputData.price != globalVars.flaggedInputData.status)
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
            "price"             : globalVars.flaggedInputData.price,
            "status"            : globalVars.flaggedInputData.status,
            "apiExt"            : "luauet-save-placed-order.php",
        };
        searchObj.merchant_order_id = searchObj.merchant_order_id.trim();
        this.apiService.customPostApiCall(searchObj).then((res: any) => {
            if (res && res.status) {
                this.onSubmit('moiUpdate');
            }
        },
        (error) => {});
    };

    showFilteredOptions(option){
        if(option == 'status') {
            this.filterdObj.showRetailer = false;
            this.filterdObj.showSortBy = false;
            this.filterdObj.showDateRange = false;
            this.filterdObj.showStatus = !this.filterdObj.showStatus
        }else if (option == 'retailers') {
            this.filterdObj.showStatus = false;
            this.filterdObj.showSortBy = false;
            this.filterdObj.showDateRange = false;
            this.filterdObj.showRetailer = !this.filterdObj.showRetailer
        }else if (option == 'sortBy') {
            this.filterdObj.showStatus = false;
            this.filterdObj.showRetailer = false;
            this.filterdObj.showDateRange = false;
            this.filterdObj.showSortBy = !this.filterdObj.showSortBy
        }else if (option == 'dateRange') {
            this.filterdObj.showStatus = false;
            this.filterdObj.showRetailer = false;
            this.filterdObj.showSortBy = false;
            this.filterdObj.showDateRange = !this.filterdObj.showDateRange
        }else this.filterdObj.showStatus = true;

        this.calculateHieght();
    };

	orderPageToggle(order){
        this.selcOrder = order;
        this.getCompleteTrackingData(order);
        
	};
    getBgColor(status) {
        status = status.toLowerCase();
        switch (status) {
        case 'cancelled':
            return '#F8B8B8';
        case 'pending':
            return '#F8B8B8';
        case 'in-transit':
            return '#9AECDD';
        case 'failed':
            return '#FF0000';
        case 'delivered':
            return '#9AECDD';
        case 'pre-shipping':
            return '#9AECDD';
        case 'flagged':
            return '#FF0000';
        }
    };

    routToSupport(){
        this.childNavigation = false;
        this.clildSupportView = !this.clildSupportView;
        if(!this.clildSupportView && !this.childNavigation) this.calculateHieght();
    };

}
