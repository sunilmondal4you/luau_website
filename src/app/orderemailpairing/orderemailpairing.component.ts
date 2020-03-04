import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import { globalVars } from './../global';
import * as _underscore from 'underscore';
import {MatDialog} from '@angular/material';

@Component({
	selector: 'app-orderemailpairing',
	templateUrl: './orderemailpairing.component.html',
	styleUrls: ['./orderemailpairing.component.css']
})
export class OrderemailpairingComponent implements OnInit {

	public userData:any = {};
	loaderStart = false;
	submitted = false;
	formSubmitted = false;
	ORDER_LIST = [];

	pager: any = {};
	pagedItems: any[];
	allItemLen: any;

	constructor(
		private formBuilder: FormBuilder, 
		private apiService : ApiService,
		private commonService: CommonService,
		private dialogRef: MatDialog,
	) { }


	ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem("userObj")); 

		this.getOrderList();
	};

	onResize(event) {
		/* Calculate TagList section hieght */
		this.calculateCardHieght()
	};

	calculateCardHieght(){
		setTimeout(function(){ 
		let wh = window.innerHeight;
		let id2Ele = document.getElementById("id2");
		let id2Bound = id2Ele.getBoundingClientRect();
		let id2PosTop = id2Bound.top;
		let id2Ht = wh-id2PosTop;
		document.getElementById("id2").style.height = id2Ht+"px";
		}, 200);
	};

	getOrderList(){
		this.submitted = false;
		// this.loaderStart = true;
		let orderReqObj = {
			"page"   : this.userData.userDetail.emailPage || 0,
			"user_id": this.userData.userDetail.user_id || 1,
			"token"  : this.userData.userDetail.token,
			"apiExt" : "luauet-get-parsing-attempted-mail.php",
		}
		this.apiService.customPostApiCall(orderReqObj).then((res:any)=>{
		if(res){
			// this.loaderStart = false;
			this.ORDER_LIST = res.orders || [];
			this.allItemLen = res.order_count;
			this.setPage((this.userData.userDetail.returnPage + 1) || 1);
		}else{
			// this.loaderStart = false;
		}
		},
		(error) => {});
		this.calculateCardHieght();
	};

	setPage(emailPage: number) {
		if (emailPage < 1 || emailPage > this.pager.totalPages) return;
		
		if (this.userData.userDetail.emailPage != emailPage - 1) {
			this.userData.userDetail.emailPage = emailPage - 1
			this.getOrderList();
			localStorage.setItem('userObj', JSON.stringify(this.userData));
		}
		this.pager = this.commonService.getPager(this.allItemLen, emailPage);
	};

	viewMore(mailObj, mails){
		_underscore.each(mails, (item)=>{
			if(item == mailObj) item.enableViewMore = !item.enableViewMore || false;
			else item.enableViewMore = false;
		});
	};

	
    orderEmailPairingDialog(selMail:any){
        this.dialogRef.closeAll();

        let message = "Order Email Pairing Dialog"
		globalVars.OEP = true;
        globalVars.flaggedInputData = {};
        this.commonService.flaggedInputDialog(message).subscribe((res:any)=>{
        let inputData:(any) = globalVars.flaggedInputData;
        if(inputData) {
			if(!globalVars.flaggedInputData.tracking_number || !globalVars.flaggedInputData.tracking_url || !globalVars.flaggedInputData.carrier)
                this.commonService.modalOpenMethod("Please fill all the detail for pairing.")
            else if(globalVars.flaggedInputData.tracking_number && globalVars.flaggedInputData.tracking_url && globalVars.flaggedInputData.carrier)
                this.orderEmailPairing(selMail)
            else
                this.commonService.modalOpenMethod("Data must be different!")
        }
        },(error) => {});
        
    };

    orderEmailPairing(selMail){
        let searchObj = {
            "order_id"          : selMail.order_id || '',
			"mail_id"           : selMail.mail_id || '',
            "merchant_order_id" : selMail.retailer_order_id || '',
            "user_id"           : this.userData.userDetail.user_id,
            "token"             : this.userData.userDetail.token,
            "carrier" 			: globalVars.flaggedInputData.carrier,
            // "price" 			: globalVars.flaggedInputData.price,
            "tracking_url" 		: globalVars.flaggedInputData.tracking_url,
            "tracking_number" 	: globalVars.flaggedInputData.tracking_number,
            "apiExt"            : "luauet-assign-mail-to-order.php",
        };
        this.apiService.customPostApiCall(searchObj).then((res: any) => {
            if (res && res.status) {
                this.getOrderList();
            }
        },
        (error) => {});
    }

}
