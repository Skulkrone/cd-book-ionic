import { Books } from '../models/Books';
import { Cds } from '../models/Cds';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class BookCdService {

    books$ = new Subject<Books[]>();
    cds$ = new Subject<Cds[]>();

    constructor(private storage: Storage) {
        this.fetchList();
    }

    bookList: Books[] = [
        {
            name: 'Le Seigneur des Anneaux',
            author: 'JRR Tolkien',
            description: [
                'C\'est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. L\'histoire reprend certains des personnages présentés dans Le Hobbit, premier roman de l\'auteur paru en 1937, mais l\'œuvre est plus complexe et plus sombre. Tolkien entreprend sa rédaction à la demande de son éditeur, Allen & Unwin, à la suite du succès critique et commercial du Hobbit. Il lui faut douze ans pour parvenir à achever ce nouveau roman qu\'il truffe de références et d\'allusions au monde du Silmarillion, la Terre du Milieu, sur lequel il travaille depuis 1917 et dans lequel Le Hobbit a été attiré « contre l\'intention première » de son auteur2. '
            ],
            isRent: true,
            renter: '',
    },
    {
            name: 'La Nuit des Temps',
            author: 'Barjavel',
            description: [
                'La Nuit des temps est un roman de science-fiction de René Barjavel. Publié en 1968 aux Presses de la Cité, il a reçu le Prix des libraires l\'année suivante. '
            ],
            isRent: true,
            renter: '',
    },
    {
            name: 'Conan Le Barbare',
            author: 'Robert E. Howard',
            description: [
                'Conan le Barbare ou Conan le Cimmérien est un personnage de fiction, dont la première nouvelle a été écrite par Robert E. Howard en 1932, et dont les histoires ont été initialement publiées au cours des années 1930 dans le pulp Weird Tales. C\'est avec ces récits (et ceux de Kull, le roi barbare, trois ans auparavant) que Howard a donné naissance à la forme moderne du genre littéraire de l\'heroic-fantasy. '
            ],
            isRent: false,
            renter: '',
    },
];

    cdList : Cds[] = [
        {
            name: 'Master Of Puppets',
            artist: 'Metallica',
            description: [
                'Master of Puppets (littéralement Le Marionnettiste), sorti le 3 mars 1986, est le troisième album studio du groupe de Thrash metal Metallica.'
            ],
            isRent: true,
            renter: '',
    },
    {
            name: 'Reign In Blood',
            artist: 'Slayer',
            description: [
                'Reign in Blood (littéralement Règne dans le sang) est le troisième album studio du groupe américain de thrash metal Slayer, sorti le 7 octobre 1986 chez Def Jam Recordings.'
            ],
            isRent: false,
            renter: '',
    },
    {
            name: 'Back In Black',
            artist: 'AC/DC',
            description: [
                'Back in Black, sorti le 25 juillet 1980, est le 7e album du groupe de hard rock AC/DC. Il s\'agit du premier album du groupe enregistré avec le chanteur Brian Johnson, qui remplace Bon Scott, à qui l\'album rend hommage. '
            ],
            isRent: true,
            renter: '',
    },
];

    emitBooks() {
        this.books$.next(this.bookList.slice());
    }

    emitCds() {
        this.cds$.next(this.cdList.slice());
    }

    saveBookData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('books').set(this.bookList).then(
            (data: DataSnapshot) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }

      saveCdData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('cds').set(this.cdList).then(
            (data: DataSnapshot) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    
      retrieveBookData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('books').once('value').then(
            (data: DataSnapshot) => {
              this.bookList = data.val();
              this.emitBooks();
              resolve('Données récupérées avec succès !');
            }, (error) => {
              reject(error);
            }
          );
        });
      }
    
      retrieveCdData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('cds').once('value').then(
            (data: DataSnapshot) => {
              this.cdList = data.val();
              this.emitCds();
              resolve('Données récupérées avec succès !');
            }, (error) => {
              reject(error);
            }
          );
        });
      }
      saveData() {
        this.storage.set('books', this.bookList);
        this.storage.set('cds', this.cdList);
    }

    fetchList() {
        this.storage.get('books').then(
            (bookList) => {
                bookList && bookList.length ? this.bookList = bookList.slice() : 0;
                this.emitBooks();
            }
        ).catch(
            (error) => {
                console.log(`erreur lors de la recuperation des livres : ${error}`);
            }
        );

        this.storage.get('cds').then(
            (cdList) => {
                cdList && cdList.length ? this.cdList = cdList.slice() : 0;
                this.emitCds();
            }
        ).catch(
            (error) => {
                console.log(`erreur lors de la recuperation des cds : ${error}`);
            }
        );
    }

    toogleRent(item: any) {
        item.isRent = !item.isRent
    }

    setElement(type: string, index: number, rent: string) {
        if (type === 'book') {
            this.bookList[index].renter = rent;
            this.bookList[index].isRent = !this.bookList[index].isRent;
            this.storage.set('books', this.bookList);
            this.emitBooks();
        }
        else if (type === 'cd') {
            this.cdList[index].renter = rent;
            this.cdList[index].isRent = !this.cdList[index].isRent;
            this.storage.set('cds', this.cdList);
            this.emitCds();
        }
    }

}