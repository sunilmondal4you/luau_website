import { Component } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { ApiService } from './api.service';
import { UAParser } from '../assets/ua-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Luau Website';
  imgPath = "./assets/img/logo.png";
  public mobileView = false;
  showNavLink = false;
  pageOpen = false;

  constructor(
    private apiService: ApiService,
  ) { };
  
  homeLink = [{"title": "Home",     "routLink":"/home"}];

  public innerWidth = window.innerWidth;
  
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

  ngOnInit() {
    if (window.innerWidth < 768) { // 768px portrait
      this.mobileView = true;
      this.pageOpen = false;
      this.innerWidth = window.innerWidth;
    }

    let pathFound = false;
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
        window.location.pathname = "/home"
      }
    }
  };
    
  onResize(event) {
    this.innerWidth = window.innerWidth;
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

  startNavigation(){
    this.pageOpen = true;
    this.showNavLink = !this.showNavLink;

    if (this.innerWidth < 768) { // 768px portrait
      this.mobileView = true;
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

      // "device_vendor"    : result.device.vendor,
      // "browser_name"     : result.browser.name,
      // "browser_version"  : result.browser.version,
      // "browser_major"    : result.browser.major,
      // "engine_name"      : result.engine.name,
      // "engine_version"   : result.engine.version, 
      // "cpu_architecture" : result.cpu.architecture,      

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
    (error) => console.log(error.message));

  }
  
}
