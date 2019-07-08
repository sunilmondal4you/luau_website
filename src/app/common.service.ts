import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as _underscore from 'underscore';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaltemplateComponent } from './modaltemplate/modaltemplate.component';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

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
    private title: Title, 
    private meta: Meta
  ) { }


  modalOpenMethod(message:any){
    /* Getting user common data */
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
    });

    /* clear previous modal data if any */
    this.userData.modalObj = {};

    /* Asigning Modal content to user common data to get into modal-component */
    this.userData.modalObj.content = message;
    this.apiService.updateUserDetail(this.userData);

    /* Open Modal */
    this.modalService.open(ModaltemplateComponent);
  };

  clearStorage(redirectTo:any){
    setTimeout(() => {
      let updateReqObj = {
        "loggedIn" : false,
        "userDetail":{ },
      }
      this.apiService.updateUserDetail(updateReqObj);
      localStorage.removeItem("userObj");
      if(redirectTo=="dashboard"){
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/home']);
      }
    }, 1000);
  };

  openDialog(message:any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: message,
    });
    return dialogRef.afterClosed();

  };

  updateMetaTitle(title: string) {
    this.title.setTitle(title);
  };

  updateMetaOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url })
  };

  updateMetaDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  };

  updateMetaDetail(reqObj:any){
    this.title.setTitle(reqObj.title);
    this.meta.updateTag({ name: 'og:url', content: reqObj.url });
    this.meta.updateTag({ name: 'description', content: reqObj.desc });
  };


}
