import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { CommonService } from './../common.service';

@Component({
  selector: 'app-productpreview',
  templateUrl: './productpreview.component.html',
  styleUrls: ['./productpreview.component.css'],
})
export class ProductpreviewComponent implements OnInit {
  public data = {
    title: 'Product Preview',
    description:'Description Meta Tag Content',
    ogUrl: 'your og url'
  };
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    //   map(() => this.activatedRoute),
    //   map((route) => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   }),
    //   filter((route) => route.outlet === 'primary'),
    //   mergeMap((route) => route.data)
    // ).subscribe(() => {
    //   this.commonService.updateMetaTitle(event['title']);
    //   this.commonService.updateMetaOgUrl(event['ogUrl']);
    //   this.commonService.updateMetaDescription(event['title'] + event['description'])    
    // });

    // this.commonService.updateMetaOgUrl(this.data.ogUrl);
    // this.commonService.updateMetaDescription(this.data.title + this.data.description)    
    this.commonService.updateMetaTitle(this.data.title);
    
  }

}
