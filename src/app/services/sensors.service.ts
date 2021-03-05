import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { toDate } from 'date-fns';
import { ru } from "date-fns/locale";

import { ISensorIndication } from '../shared/models';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private _selectedSensor$$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private dbSvc: DbService) { }

  setSelectedSensor(sensorId: string = null) {
    sensorId && localStorage.setItem('sensorID', sensorId);

    this._selectedSensor$$.next(sensorId);
  }

  get selectedSensor() {
    const id = localStorage.getItem('sensorID');
    if (id) this._selectedSensor$$.next(id);
    return this._selectedSensor$$.value;
  }

  getAllSensorData(sensorId: string, dateRange?: { startAt: number, endAt: number; }) {
    console.log({ dateRange });

    const reduceToEvery = (factor = 100) => (items: ISensorIndication[]) => items.filter((_, i) => (i % factor == 0));
    const reducingFn = reduceToEvery(1000);

    return this.dbSvc.list<ISensorIndication>({ path: sensorIdPath(sensorId), dateRange, reducingFn }).pipe(
      map((data: (ISensorIndication & { keyID?: string; })[]) => data.map((singleVal) => ({
        ...singleVal,
        date: toDate(singleVal.timestamp),
        RuDate: ru.formatLong.dateTime(singleVal.timestamp)
      })))
    );
  }

  getSensorFirstVal(sensorId: string) {
    return this.dbSvc.getFirstOnce<ISensorIndication>(sensorIdPath(sensorId));
  }

  getSensorLastVal(sensorId: string) {
    return this.dbSvc.getLastOnce<ISensorIndication>(sensorIdPath(sensorId));
  }

  getSensorFirstValTime(sensorId: string) {
    return this.getSensorFirstVal(sensorId).pipe(
      map(sensorRes => toDate(sensorRes.timestamp)),
      tap(date => console.log('[SensorsSvc->getAllSensorData()]  Sensor first Time ::: ', date))
    );
  }

  getSensorLastValTime(sensorId: string) {
    return this.getSensorLastVal(sensorId).pipe(
      map(sensorRes => toDate(sensorRes.timestamp)),
      tap(date => console.log('[SensorsSvc->getAllSensorData()]  Sensor Last Time ::: ', date))
    );
  }

}


const sensorIdPath = (sensorId: string) => `sensors/${sensorId}`;