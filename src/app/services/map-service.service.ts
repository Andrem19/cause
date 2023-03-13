import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, Subject, Subscription, take } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  id!: String;
  tableSubject = new Subject();
  oneMap = new Subject()
  subscriptions: Array<Subscription> = []
  constructor(private dbService: DbService) {
    this.initChangeHandler();
   }

  initChangeHandler() {
    let sub: Subscription = this.dbService
    .getCurrentTableChanges()
    .subscribe((change) => {
      if (change) {
        console.warn('handleChange called')
        this.handleChange();
      }
    });
    this.subscriptions.push(sub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  handleChange() {
    this.fetchMaps();
  }

  fetchMaps() {
    let query = {
      selector: {
        type: 'map',
      },
      fields: ['_id', '_rev', 'Coordinates', 'Name_of_location', 'type', 'Description_of_location', 'image', 'NPC'],
      execution_stats: true,
    };
    let q: Observable<any> = from(this.dbService.db.find(query)).pipe(
      map((obj: any) => obj['docs'])
    )
    q.pipe(take(1), catchError((_) => of([]))).subscribe((tableDocs) => {
      this.tableSubject.next(tableDocs)
    })
  }

  fetchMap() {
    let query = {
      selector: {
        _id: this.id,
      },
      fields: ['_id', '_rev', 'Coordinates', 'Name_of_location', 'type', 'Description_of_location', 'image', 'NPC'],
      execution_stats: true,
    };
    let q: Observable<any> = from(this.dbService.db.find(query)).pipe(
      map((obj: any) => obj['docs'])
    )
    q.pipe(take(1), catchError((_) => of([]))).subscribe((mapDocs) => {
      this.oneMap.next(mapDocs)
    })
  }

  getCurrentTables() {
    return this.tableSubject.asObservable();
  }
  getCurrentMap(idi: String) {
    this.id = idi;
    return this.oneMap.asObservable();
  }
}
