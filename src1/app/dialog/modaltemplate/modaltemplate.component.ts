import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
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
    private apiService : ApiService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userObj"));
    this.modalObj = this.userData.modalObj;

  }

}
