import { Component } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { ApiService } from './api.service';
import { UAParser } from '../assets/ua-parser';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { KeycloakService } from './keycloak.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  config = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  title = 'Luau Website';
  imgPath = "./assets/img/logo.png";
  public mobileView = false;
  showNavLink = false;
  pageOpen = false;
  public userData:any = {};
  products: string[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    // private http: Http,
    private kc: KeycloakService
  ) { };
  
  homeLink = [{"title": "Home",     "routLink":"/home"}];

  public innerWidth = screen.width;
  
  linkList = [
    {"title": "Brand Signup",     "routLink":"/brand"},
    {"title": "Press Inquiries",  "routLink":"/inquiries"},
    {"title": "Customer Service", "routLink":"/services"},
    {"title": "Support",          "routLink":"/support"},
    {"title": "Dashboard",        "routLink":"/dashboard"},
  ];
  footerLinkList = [
    {"title": "Privacy Policy",   "routLink":"/privacy"},
    {"title": "Terms of Use",     "routLink":"/terms"}
  ];
  allLinkList = this.homeLink.concat(this.linkList, this.footerLinkList);

  imgPathM = "./assets/img/admin.png";
  orderViewList1 = [
    {"title": "Decks-site",       "routLink":"/orders"},
    {"title": "Featured Products","routLink":"/orders"},
    {"title": "Feed Widgets",     "routLink":"/orders"}
  ];
  orderViewList2 = [
    {"title": "Product Categories","routLink":"/orders"},
    {"title": "Tags Database",     "routLink":"/tagsdatabaseComponent"},
    {"title": "Order",             "routLink":"/orders"},
    {"title": "Returns",           "routLink":"/orders"}
  ];
  footerOrderList = [
    {"title": "Log out",   "routLink":"/orders"},
  ];

  ngOnInit() {
    this.reloadData();
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
    });

    if (window.innerWidth < 768) { // 768px portrait
      this.mobileView = true;
      this.pageOpen = false;
      this.innerWidth = window.innerWidth;
    }

    /** get ueser object from Session storage **/
    let userObj:any = localStorage.getItem("userObj");
    userObj = JSON.parse(userObj);

    this.userData = userObj || this.userData;

    let pathFound = false;
    if(this.userData.loggedIn){
      this.apiService.updateUserDetail(this.userData);
      // this.router.navigate(['/orders']);
    }else{
      let prodExtension = "/v1/products/"
      let externalLinkFound = window.location.href.includes(prodExtension);     // get true/false
      if(window.location.pathname != "/" && externalLinkFound){
        let prod_id = window.location.pathname.substr(prodExtension.length);
        this.deeplinkingPostCall(Number(prod_id)); 
  
        window.location.href='https://itunes.apple.com/in/app/luau-modern-shopping/id1348751802?mt=8';
      }else{
        this.allLinkList.forEach(obj => {
          if(obj.routLink == window.location.pathname){
            pathFound = true;
          }
        });
  
        if(!pathFound){
          this.router.navigate(['/home']);
        }
      }
    }
  };

  reloadData() {
    let reqObj = {
      "client_id" : "luau-app",
      "client_secret" : "c8c393b3-b9f0-4aa1-988c-7f12d4caacd7",
      "grant_type" : "client_credentials"
    }
    this.http.post('https://dev.keycloak.luauet.com/auth/realms/luau-dev/protocol/openid-connect/token', reqObj, { headers: this.config }).subscribe((res:any)=>{
      if(res){
        if(res.status == "success"){
          console.log("System data send successfully")
        }
      }else{
        console.log("Post api call for token fails")
      }
    },
    (error) => {
      if(error.status==401){
        this.commonService.clearStorage("home");
      }else{
        this.commonService.modalOpenMethod(error.message)        
      }
    });
  }

  onResize(event) {
    this.innerWidth = screen.width;
    if (this.innerWidth < 768) { // 768px portrait
      event.target.innerWidth;
      this.mobileView = true;
      this.pageOpen = false;
    }else{
      event.target.innerWidth;
      this.mobileView = false;
      this.pageOpen = true;
    }
  };

  toggleNavLinks(){
    this.showNavLink = !this.showNavLink;

    if(this.showNavLink==true){
      this.pageOpen = false;
    }
  };

  startNavigation(logOut){
    this.pageOpen = true;
    this.showNavLink = !this.showNavLink;

    if (this.innerWidth < 768) { // 768px portrait
      this.mobileView = true;
    }

    if(logOut){
      this.logOutCall();
    }
  };

  deeplinkingPostCall(prod_id:any) {
    let parser = new UAParser();
    let nav = window.navigator;

    parser.setUA(nav.userAgent);
    
    let result = parser.getResult();
     
    let systemObject = {
      "product_id"   : prod_id,
      "device_model" : result.device.model,
      "device_type"  : result.device.type,
      "os_name"      : result.os.name,
      "os_version"   : result.os.version,
      "screen_width" : screen.width,
      "screen_height": screen.height,
      "apiExt" : "add-deeplinking-data.php",
    };

    this.apiService.customPostApiCall(systemObject).subscribe((res:any)=>{
      if(res){
        if(res.status == "success"){
          console.log("System data send successfully")
        }
      }else{
        console.log("Post api call for deeplinking fails")
      }
    },
    (error) => {
      if(error.status==401){
        this.commonService.clearStorage("home");
      }else{
        this.commonService.modalOpenMethod(error.message)        
      }
    });

  };

  ///////   LOG OUT   \\\\\\\
  logOutCall() {
    let reqObj = {
      "user_id" : this.userData.userDetail.user_id,
      "token": this.userData.userDetail.token,
      "apiExt"  : "luauet-dashboard-logout.php",
    }
    this.apiService.customPostApiCall(reqObj).subscribe((res:any)=>{
      if(res.status == "success"){
        this.updateUserDetail();
      }else{
        this.commonService.modalOpenMethod(res.message);
      }
    },
    (error) => {
      if(error.status==401){
        this.commonService.clearStorage("dashboard");
      }else{
        this.commonService.modalOpenMethod(error.message)        
      }
    });
  };

  updateUserDetail(){
    let updateReqObj = {
      "loggedIn" : false,
      "userDetail":{ },
    }
    this.apiService.updateUserDetail(updateReqObj);
    localStorage.removeItem("userObj");
    this.router.navigate(['/home']);
  };
  
}
