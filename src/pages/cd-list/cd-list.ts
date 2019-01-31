import { Component } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { Cds } from '../../models/Cds';
import { BookCdService } from '../../services/bookCd.service';
import { LendCdPage } from './lend-cd/lend-cd';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdList: Cds[];

  constructor(private modalCtrl: ModalController,
    private bookCdService: BookCdService,
    private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.cdList = this.bookCdService.cdList.slice();
  }

  onLoadCd(index :number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

}
