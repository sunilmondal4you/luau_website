import { Component } from '@angular/core';

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

  ngOnInit() {
    if (window.screen.width < 768) { // 768px portrait
      this.mobileView = true;
    }
  }

  onResize(event) {
    if (window.screen.width < 768) { // 768px portrait
      event.target.innerWidth;
      this.mobileView = true;
    }else{
      event.target.innerWidth;
      this.mobileView = false;
    }
  };

  toggleNavLinks(){
    this.showNavLink = !this.showNavLink;
  }
  
}
