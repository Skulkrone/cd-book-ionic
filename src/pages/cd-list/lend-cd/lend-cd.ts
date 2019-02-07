import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Cds } from '../../../models/Cds';
import { BookCdService } from '../../../services/bookCd.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  cd: Cds;
  index: number;
  cdForm: FormGroup;

  constructor(private viewCtrl: ViewController,
     public navParams: NavParams,
     private cdService: BookCdService,
     private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.cd = this.navParams.get('cd');
    this.index = this.navParams.get('index');
    this.cd = this.cdService.cdList[this.index];
    if (!this.cd.isRent){
      this.initForm()
    } else {
      return null;
    }
  }

  initForm() {
    this.cdForm = this.formBuilder.group({
      renter: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmitForm() {
    const renter = this.cdForm.get('renter').value;

    this.cdService.setElement('cd', this.index, renter);
    this.dismissModal();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleCd() {
    if (this.cd.isRent) {
      this.initForm();
      this.cdService.setElement('cd', this.index, '');
    }
    else
      this.cdService.setElement('book', this.index, this.cd.renter);
  }

}
