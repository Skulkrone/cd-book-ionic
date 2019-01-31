import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { BookCdService } from '../../../services/bookCd.service';
import { Books } from '../../../models/Books';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {

  book: Books;
  index: number;

  constructor(public viewCtrl: ViewController,
     public navParams: NavParams,
     private bookService: BookCdService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.bookService.bookList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleBook () {
    this.book.isRent = !this.book.isRent;
  }

  

}
