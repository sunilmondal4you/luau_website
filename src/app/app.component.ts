import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { UAParser } from '../assets/ua-parser';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    private tokenService : TokenService,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
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
    {"title": "Product Categories","routLink":"/categotiesComponent"},
    {"title": "Tags Database",     "routLink":"/tagsdatabaseComponent"},
    {"title": "Order",             "routLink":"/orders"},
    {"title": "Returns",           "routLink":"/orders"}
  ];
  allLinkList2 = this.homeLink.concat(this.orderViewList1, this.orderViewList2);

  footerOrderList = [
    {"title": "Log out",   "routLink":"/home"},
  ];

  ngOnInit() {
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData = data;
      this.getKeycloakToken();

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
        // this.apiService.updateUserDetail(this.userData);
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
    });

    
  };

  getKeycloakToken() {
    this.tokenService.tokenPostCall().subscribe((res:any)=>{
      if(res){
        if(res.refresh_token){
          this.userData.userDetail.access_token = res.access_token;
          this.userData.userDetail.refresh_token = res.refresh_token;
          this.apiService.updateUserDetail(this.userData);
          localStorage.setItem('userObj', JSON.stringify(this.userData));
        }
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
        this.showNavLink = false
      }else{
        this.commonService.modalOpenMethod(res.message);
      }
    },
    (error) => {
      if(error.status==401){
        this.updateUserDetail();
        this.showNavLink = false
        this.commonService.clearStorage("dashboard");
      }else{
        this.commonService.modalOpenMethod(error.message)        
      }
    });
  };

  updateUserDetail(){
    this.userData.loggedIn = false;
    let updateReqObj = {
      "loggedIn" : false,
      "userDetail":{ },
    }
    this.apiService.updateUserDetail(updateReqObj);
    this.userData = updateReqObj;
    localStorage.removeItem("userObj");
    this.router.navigate(['/home']);
  };
  
}
