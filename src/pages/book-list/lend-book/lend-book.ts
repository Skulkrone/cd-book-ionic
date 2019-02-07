import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { BookCdService } from '../../../services/bookCd.service';
import { Books } from '../../../models/Books';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {

  book: Books;
  index: number;
  bookForm: FormGroup;

  constructor(private viewCtrl: ViewController,
     public navParams: NavParams,
     private bookService: BookCdService,
     private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.book = this.navParams.get('book');
    this.index = this.navParams.get('index');
    this.book = this.bookService.bookList[this.index];
    if (!this.book.isRent){
      this.initForm()
    } else {
      return null;
    }
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      renter: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmitForm() {
    const renter = this.bookForm.get('renter').value;
    
    this.bookService.setElement('book', this.index, renter);
    this.dismissModal();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleBook() {
    if (this.book.isRent) {
      this.initForm();
      this.bookService.setElement('book', this.index, '');
    }
    else
      this.bookService.setElement('book', this.index, this.book.renter);
  }

}
