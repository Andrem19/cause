import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, Subject, Subscription, take } from 'rxjs';
import { User } from '../models/user';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject = new Subject();
  oneUser = new Subject()
  subscriptions: Array<Subscription> = []
  userEmail!: string;
  constructor(private dbService: DbService) {

   }

   async fetchUser(): Promise<any> {
    let query = {
      selector: {
        email: this.userEmail,
      },
      fields: ['_id', '_rev', 'username', 'email', 'Coordinates', 'image', 'token', 'Stats', 'Level', 'Race', 'hashed_password'],
      execution_stats: true,
    };
    let q: Observable<any> = from(this.dbService.db.find(query)).pipe(
      map((obj: any) => obj['docs'])
    )
    q.pipe(take(1), catchError((_) => of([]))).subscribe((tableDocs) => {
      this.userSubject.next(tableDocs)
      console.log(tableDocs)
      return tableDocs;
    })
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
    this.fetchUser();
  }

  getCurrentUser(email: string){
    this.userEmail = email;
    return this.userSubject.asObservable();
  }
}
