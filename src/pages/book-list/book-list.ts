import { Component } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { BookCdService } from '../../services/bookCd.service';
import { Books } from '../../models/Books';
import { LendBookPage } from './lend-book/lend-book';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  bookList: Books[];

  constructor(private modalCtrl: ModalController,
    private bookCdService: BookCdService,
    private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.bookList = this.bookCdService.bookList.slice();
  }

  onLoadBook(index :number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  

}
