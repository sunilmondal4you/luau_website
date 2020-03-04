import { Component } from '@angular/core';
import {Location} from "@angular/common";
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { UAParser } from '../assets/ua-parser';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { globalVars } from './global';
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
  dispMainMenu = true;

  constructor(
    private location: Location,
    private apiService: ApiService,
    private tokenService : TokenService,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
  ) { };

  homeLink = [{"title": "Home",     "routLink":"/home", "loggedIn":false}];

  public innerWidth = screen.width;
  
  linkList = [
    {"title": "Brand Signup",     "routLink":"/brand",     "loggedIn":false},
    {"title": "Press Inquiries",  "routLink":"/inquiries", "loggedIn":false},
    {"title": "Customer Service", "routLink":"/services",  "loggedIn":false},
    {"title": "Support",          "routLink":"/support",   "loggedIn":false},
    {"title": "Dashboard",        "routLink":"/dashboard", "loggedIn":false},

    {"title": "Order",             "routLink":"/orders",   "loggedIn":true},
    {"title": "Order Dashboard",   "routLink":"/orderdashboard","loggedIn":true},
    {"title": "Returns",           "routLink":"/returns",  "loggedIn":true},
    {"title": "Flagged",           "routLink":"/flagged",  "loggedIn":true},
    {"title": "Tags Database",     "routLink":"/tagsdatabase","loggedIn":true},
    {"title": "Retailers",         "routLink":"/retailers", "loggedIn":true},
    // {"title": "Product Categories","routLink":"/categories",      "loggedIn":true},
    // {"title": "Tracking Number",   "routLink":"/trackingnumbers", "loggedIn":true},
    // {"title": "Featured Products", "routLink":"/featuredproducts","loggedIn":true},
    {"title": "Order Email Pairing", "routLink":"/orderemailpairing","loggedIn":true},
  ];
  footerLinkList = [
    {"title": "Privacy Policy",   "routLink":"/privacy","loggedIn":false},
    {"title": "Terms of Use",     "routLink":"/terms",  "loggedIn":false},

    {"title": "Log out",          "routLink":"/dashboard","loggedIn":true},
  ];
  allLinkList = this.homeLink.concat(this.linkList, this.footerLinkList);

  imgPathM = "./assets/img/admin.png";

  ngOnInit() {
    this.location.subscribe(x => {
      let userObj:any = JSON.parse(localStorage.getItem("userObj"));
      if(window.location.pathname == '/orderdashboard') this.dispMainMenu = false;
      else this.dispMainMenu = true;
      if(userObj.loggedIn && window.location.pathname == '/dashboard') window.location.pathname = '/orders';
    })
    this.getKeycloakToken();

    if (window.innerWidth < 768) { // 768px portrait
      this.mobileView = true;
      this.pageOpen = false;
      this.innerWidth = window.innerWidth;
    }
    this.apiService.setBaseURL();
    this.apiService.userObjObserveable.subscribe((data) => {
      this.userData.loggedIn = data.loggedIn;
      this.dispMainMenu = (data.dispMainMenu) ? true : false;
    });
    /** get ueser object from Session storage **/
    let userObj:any = JSON.parse(localStorage.getItem("userObj"));
    if (userObj) {
      globalVars.userObj = userObj;
      this.apiService.updateUserDetail({loggedIn:userObj.loggedIn, dispMainMenu :this.dispMainMenu});
      this.userData = userObj;
    }else{
      globalVars.userObj = {"loggedIn":false,"dispMainMenu":true,"page":0,"userDetail":{},"modalObj":{}}
      this.userData = globalVars.userObj;
    }
    
    let pathFound = false;
    if(globalVars.userObj.loggedIn){
      this.dispMainMenu = (window.location.pathname == "/orderdashboard") ? false : true;
      if(window.location.pathname == "/"){
        this.router.navigate(['/orders']);
      }else{
        let loggedInPath;
        this.allLinkList.forEach(obj => {
          if((obj.routLink == window.location.pathname) && obj.loggedIn){
            loggedInPath = obj.routLink;
            return;
          }
        });
        if(loggedInPath){
          this.router.navigate([loggedInPath]);
        }else{
          this.router.navigate(['/orders']);
        }
      } 
    }else{
      this.dispMainMenu = true;
      if(window.location.pathname=="/orders"){
        window.location.pathname = '/dashboard'
        this.router.navigate(['/dashboard']);
      }
      let prodExtension = "/v1/products/"
      let externalLinkFound = window.location.href.includes(prodExtension);     // get true/false
      if(window.location.pathname != "/" && externalLinkFound){
        let prod_id = window.location.pathname.substr(prodExtension.length);
        this.deeplinkingPostCall(Number(prod_id)); 
  
        window.location.href='https://itunes.apple.com/in/app/luau-modern-shopping/id1348751802?mt=8';
      }else{
        this.allLinkList.forEach(obj => {
          if((obj.routLink == window.location.pathname) && !obj.loggedIn){
            pathFound = true;
          }
        });
  
        if(!pathFound){
          if(window.location.pathname == '/privacy-policy/'){
            this.router.navigate(['/privacy']);
          }else if(window.location.pathname == '/support/'){
            this.router.navigate(['/support']);
          }else{
            this.router.navigate(['/home']);
          }
        }
      }
    }   
  };

  getKeycloakToken() {
    let ref = this;
    if(globalVars.userObj && !globalVars.refresh_token){
      this.tokenService.tokenPostCall(function(){
        localStorage.setItem('userObj', JSON.stringify(globalVars.userObj));
        ref.getKeycloakToken();
      })
    }
  };

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

  startNavigation(option){
    if(option == '/orderdashboard') {
      this.dispMainMenu = false;
      let obj = {loggedIn:true, dispMainMenu:false}
      this.apiService.updateUserDetail(obj);
    }else{
      this.dispMainMenu = true;

      this.pageOpen = true;
      this.showNavLink = !this.showNavLink;

      if (this.innerWidth < 768) { // 768px portrait
        this.mobileView = true;
      }

      if(option == 'logOut'){
        this.logOutCall();
      }
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
      "type"         : (window.location.search == "?type=gift") ? "gift" : "",
      "apiExt" : "add-deeplinking-data.php",
    };

    this.apiService.customPostApiCall(systemObject).then((res:any)=>{
      if(res){
        if(res.status == "success"){
          console.log("System data send successfully")
        }
      }
    },
    (error) => {});

  };

  ///////   LOG OUT   \\\\\\\
  logOutCall() {
    let reqObj = {
      "user_id" : globalVars.userObj.userDetail.user_id,
      "token": globalVars.userObj.userDetail.token,
      "apiExt"  : "luauet-dashboard-logout.php",
    }
    this.userData.loggedIn = false;
    this.dispMainMenu = true;
    this.apiService.customPostApiCall(reqObj).then((res:any)=>{
      if(res.status == "success"){
        this.showNavLink = false
        this.commonService.clearStorage('dashboard')
      }
    },
    (error) => {
      this.showNavLink = false;
    });
  };
}
