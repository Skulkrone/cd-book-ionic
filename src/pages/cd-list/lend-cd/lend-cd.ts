import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Cds } from '../../../models/Cds';
import { BookCdService } from '../../../services/bookCd.service';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  cd: Cds;
  index: number;

  constructor(public viewCtrl: ViewController,
     public navParams: NavParams,
     private cdService: BookCdService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.cdService.cdList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleCd () {
    this.cd.isRent = !this.cd.isRent;
  }

}
