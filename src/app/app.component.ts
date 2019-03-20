import { Component } from '@angular/core';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Luau Website';
  imgPath = "./assets/img/logo.png";
  public mobileView = false;
  public baseurl = 'http://dev.api.luauet.com/luau-api/scripts/';
  showNavLink = false;
  pageOpen = false;
  
  homeLink = [{"title": "Home",     "routLink":"/home"}];

  public innerWidth = window.innerWidth;
  
  linkList = [
    {"title": "Brand Signup",     "routLink":"/brand"},
    {"title": "Press Inquiries",  "routLink":"/inquiries"},
    {"title": "Customer Service", "routLink":"/services"},
    {"title": "Support",          "routLink":"/support"}
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
    let externalLinkFound = window.location.href.includes("/v1/products/");     // get true/false
    if(window.location.pathname != "/" && externalLinkFound){
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
  
}
