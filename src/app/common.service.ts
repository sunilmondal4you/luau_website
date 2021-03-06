import { Injectable } from '@angular/core';
import * as _underscore from 'underscore';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { globalVars } from './global';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaltemplateComponent } from './dialog/modaltemplate/modaltemplate.component';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { FlaggedInputDialogComponent } from './flagged/flagged-input-dialog/flagged-input-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private userData:any = {};

  constructor(
    private router: Router,
    private apiService: ApiService,
    private modalService: NgbModal,
    public dialog: MatDialog,
  ) { }


  modalOpenMethod(message:any){
    /* Getting user common data */
    this.userData = JSON.parse(localStorage.getItem("userObj"));

    /* clear previous modal data if any */
    this.userData.modalObj = {};

    /* Asigning Modal content to user common data to get into modal-component */
    this.userData.modalObj.content = message;
    localStorage.setItem('userObj', JSON.stringify(this.userData));

    /* Open Modal */
    this.modalService.open(ModaltemplateComponent);
  };

  clearStorage(redirectTo:any){
    setTimeout(() => {
      let updateReqObj = {
        "loggedIn" : false, 'dispMainMenu':true
      }
      let tempObj = {
        "loggedIn" : false,
        "dispMainMenu":true,
        "userDetail":{},
        "modalObj": {},
        "page": 0
      };
      this.apiService.updateUserDetail(updateReqObj);
      localStorage.setItem('userObj', JSON.stringify(tempObj));      
      if(redirectTo=="dashboard"){
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/home']);
      }
    }, 1000);
  };

  updateUserDetailOnLogin(res:any){
    let orderReqObj = {
      "loggedIn" : true,
      'dispMainMenu':true,
      "userDetail":{
        "page" : 0,
        "user_id"  : res.user_id || 1,
        "token": res.user_token,
      },
    };
    
    /** Update user data to services and Session Storage **/
    globalVars.userObj = orderReqObj;
    localStorage.setItem('userObj', JSON.stringify(orderReqObj));
    let tempObj = {
      'loggedIn' : true, 'dispMainMenu':true
    }
    this.apiService.updateUserDetail(tempObj);

    this.router.navigate(['/orders']);
  };

  openDialog(message:any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: message,
    });
    return dialogRef.afterClosed();
  };
  
  flaggedInputDialog(message:any) {
    const dialogRef = this.dialog.open(FlaggedInputDialogComponent, {
      width: '350px',
      data: message,
    });
    return dialogRef.afterClosed();
  };

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage+2;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _underscore.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  };


}
