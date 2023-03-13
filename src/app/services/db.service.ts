import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: any;
  remote: any;

  _tableSubject = new Subject();

  constructor() {
    PouchDB.plugin(PouchDBFind)
    this.db = new PouchDB('couse_world')
    this.remote = 'http://admin:root@localhost:5984/couse_world';
    const options = {
      live: true,
      retry: true
    }
    this.db.sync(this.remote, options).catch((err: any) => {
      console.log(err);
    });
    this.db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change: any) => {
      if (change.doc.type === 'map') {
        console.warn('Change detected on table document');
        console.warn(change.doc)
        this._tableSubject.next(true);
      }
    });
   }
   getCurrentTableChanges() {
    return this._tableSubject.asObservable();
   }
}
