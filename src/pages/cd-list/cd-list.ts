import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { Cds } from '../../models/Cds';
import { BookCdService } from '../../services/bookCd.service';
import { LendCdPage } from './lend-cd/lend-cd';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage implements OnInit, OnDestroy {

  cdList: Cds[];
  cdSubscription: Subscription;

  constructor(private modalCtrl: ModalController,
    private bookCdService: BookCdService,
    private menuCtrl: MenuController) {
  }

  ngOnInit() {
    this.cdSubscription = this.bookCdService.cds$.subscribe(
      (cds: Cds[]) => {
        this.cdList = cds;
      }
    );
    this.bookCdService.emitCds();
  }

  onLoadCd(index :number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  ngOnDestroy() {
    this.cdSubscription.unsubscribe();
  }

}
