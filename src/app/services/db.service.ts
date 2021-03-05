import { Injectable } from '@angular/core';
import { AngularFireDatabase, ChildEvent, QueryFn, SnapshotAction } from '@angular/fire/database';
import { Observable, Subscriber, from, of, throwError } from 'rxjs';
import { catchError, concatMap, map, take, tap } from 'rxjs/operators';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private fDb: AngularFireDatabase) { }

  listSnapshots<T>({ path, query, snapEvents }: { path: string; query?: QueryFn; snapEvents?: string[]; } = { path: '', query: null, snapEvents: ['child_added', 'child_removed'] }) {
    return new Observable<T[]>((inner: Subscriber<T[]>) => {
      const events: Array<ChildEvent> = snapEvents as Array<ChildEvent>;
      this.fDb.list(path, query).snapshotChanges(events).pipe(
        // shareReplay({ bufferSize: 1, refCount: true, windowTime: 300 }),
        concatMap((vals: Array<SnapshotAction<T>>) => {
          let chats = vals.map(val => val.payload.exists() && val.payload.val() as T);
          return of(chats);
        }),
        // tap(vals => console.log(`[dbSvc->listSnapshots()] :: new snapshot ${JSON.stringify(vals)}`)),
        catchError((err) => {
          console.error(`[DbService->listSnapshots()] ::::::::   ${JSON.stringify(err)}`);
          return of(null);
        })
      ).subscribe(
        val => inner.next(val),
        err => inner.error(err),
        () => inner.complete()
      );
    });
  }


  list<T>({ path, dateRange, snapEvents, reducingFn }: {
    path: string;
    dateRange?: { startAt: number, endAt: number; };
    snapEvents?: string[];
    reducingFn?: (arg0: T[]) => T[];
  } = {
      path: '',
      dateRange: null,
      snapEvents: ['child_added'],
      reducingFn: null
    }
  ) {
    const events: Array<ChildEvent> = snapEvents as Array<ChildEvent>;

    return new Observable<(T & { keyID?: string; })[]>(inner => {
      const sensorDataRef = this.fDb.object<T[]>(path).query.ref;

      const startAT = dateRange.startAt || (Date.now() - 1000 * 60 * 60 * 60 * 24);
      const endAT = dateRange.endAt || Date.now();

      let query: QueryFn | null = ((ref: firebase.database.Reference) => sensorDataRef.orderByChild('timestamp')
        .startAfter(startAT, 'timestamp')
        .endBefore(endAT, 'timestamp'));


      return this.fDb.list<T>(sensorDataRef, query).valueChanges(events, { idField: 'keyID' }).pipe(
        // shareReplay({ bufferSize: 1, refCount: true, windowTime: 300 }),
        tap(vals => console.log(`[DbSvc->list<T>()] number of Items ::::::::::::::::::::::::::::: ${vals.length} `)),
        map((vals: (T & { keyID?: string; })[]) => {
          if (!reducingFn) return vals;

          return reducingFn(vals);
        }),
        tap(vals => console.log(`[DbSvc->list<T>()] REDUCED number of Items ::::::::::::::::::::::::::::: ${vals.length} `)),
        catchError((err) => {
          console.error(`[DbService->list()]::::::::   ${JSON.stringify(err)}`);
          return throwError(err);
        })
      ).subscribe(
        val => inner.next(val),
        err => inner.error(err),
        () => inner.complete()
      );
    });

  }

  update<T>(path: string, data: object) {
    return from(this.fDb.object<T>(path).update(data));
  }

  set<T>(path: string, data: T) {
    return from(this.fDb.object<T>(path).set(data));
  }

  push<T>(path: string, data: T) {
    // let pushID = this.fDb.createPushId();
    // data = { ...data, pushID };

    // return from(this.fDb.list<T>(path).push(data)).pipe(map(pushResult => pushResult.toJSON()));

    return from(this.fDb.database.ref(`${path}`).push(data)).pipe(map(pushResult => pushResult.toJSON()));
  }

  get<T>(path: string) {
    let objectRef = this.fDb.database.ref(path);
    objectRef.orderByKey().ref.get().then(object => object.val());
    return this.fDb.object<T>(path).valueChanges().pipe(
      catchError((err) => {
        console.error(`[DbService->get()]::::::::   ${JSON.stringify(err)}`);
        return throwError(err);
      })
    );
  }

  getFirstOnce<T>(path: string) {
    // this.fDb.object<T>()
    return from(new Promise((resolve, reject) => this.fDb.database.ref(path).orderByKey().limitToFirst(1).once('value', snap => resolve(snap.val()))))
      .pipe(
        take(1),
        map(val => Object.values(val)[0] as T),
        tap(_ => console.log(`Get Single value from path ${path} `)),
        catchError(err => {
          console.error(`[DbService->delete()]::::::::   ${JSON.stringify(err)}`);
          return throwError(err);
        })
      );
  }

  getLastOnce<T>(path: string) {
    return from(new Promise((resolve, reject) => this.fDb.database.ref(path).orderByKey().limitToLast(1).once('value', snap => resolve(snap.val()))))
      .pipe(
        take(1),
        map(val => Object.values(val)[0] as T),
        tap(_ => console.log(`Get Single value from path ${path} `)),
        catchError(err => {
          console.error(`[DbService->delete()]::::::::   ${JSON.stringify(err)}`);
          return throwError(err);
        })
      );
  }

  delete(path: string, keyId: string) {
    return from(this.fDb.list(path, ref => ref.child(keyId)).query.ref.remove()).pipe(
      tap(_ => console.log(`Removed entry from path ${path} with KeyID :: ${keyId}`)),
      catchError(err => {
        console.error(`[DbService->delete()]::::::::   ${JSON.stringify(err)}`);
        return throwError(err);
      })
    );
  }

  async getSnapshot<T>(path: string): Promise<T> {
    const item = await (this.fDb.database.ref(path).once('value'));
    return item.exists() && (item.toJSON() as T);
  }

}

