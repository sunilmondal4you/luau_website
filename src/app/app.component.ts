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
  mobileView = false;
  showNavLink = false;
  pageOpen = false;
  innerWidth = window.innerWidth;
  linkList = [
    {"title": "Download",         "routLink":"/download"},
    {"title": "Brand Singup",     "routLink":"/brand"},
    {"title": "Press Inqueries",  "routLink":"/inqueries"},
    {"title": "Customer Service", "routLink":"/services"},
    {"title": "Suport",           "routLink":"/suport"}
  ]

  ngOnInit() {
    if (window.screen.width < 768) { // 768px portrait
      this.mobileView = true;
      this.pageOpen = false;
      this.innerWidth = window.innerWidth;
    }
  }

  onResize(event) {
    if (window.screen.width < 768) { // 768px portrait
      event.target.innerWidth;
      this.mobileView = true;
      this.pageOpen = false;
    }else{
      event.target.innerWidth;
      this.mobileView = false;
      this.pageOpen = true;
    }
    this.innerWidth = window.innerWidth;
  };

  toggleNavLinks(){
    this.showNavLink = !this.showNavLink;

    if(this.showNavLink==true){
      this.pageOpen = false;
      this.showNavLink = true;
    }
  };

  startNavigation(){
    this.pageOpen = true;
    this.showNavLink = !this.showNavLink;

    if (window.screen.width < 768) { // 768px portrait
      this.mobileView = true;
    }
  };
  
}
