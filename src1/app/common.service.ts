import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaltemplateComponent } from './modaltemplate/modaltemplate.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private userData:any = {};

  constructor(
    private router: Router,
    private apiService: ApiService,
    private modalService: NgbModal,
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
  }
}