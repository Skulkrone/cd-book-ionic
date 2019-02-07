import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { BookCdService } from '../../services/bookCd.service';
import { Books } from '../../models/Books';
import { LendBookPage } from './lend-book/lend-book';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy {

  bookList: Books[];
  bookSubscription: Subscription;

  constructor(private modalCtrl: ModalController,
    private bookCdService: BookCdService,
    private menuCtrl: MenuController) {
  }

  ngOnInit() {
    this.bookSubscription = this.bookCdService.books$.subscribe(
      (books: Books[]) => {
        this.bookList = books;
      }
    );
    this.bookCdService.emitBooks();
  }

  onLoadBook(index :number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

}
