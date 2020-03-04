import { Component, OnInit } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modaltemplate',
  templateUrl: './modaltemplate.component.html',
  styleUrls: ['./modaltemplate.component.css']
})
export class ModaltemplateComponent implements OnInit {
  private userData:any = {};
  public modalObj:any = {};

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userObj"));
    this.modalObj = this.userData.modalObj;

  }

}
