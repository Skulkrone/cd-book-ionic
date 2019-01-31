import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BookListPage } from '../book-list/book-list';
import { CdListPage } from '../cd-list/cd-list';
import { SettingsPage } from '../settings/settings';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
    bookListPage = BookListPage;
    cdListPage = CdListPage;
    settingsPage = SettingsPage;
}
