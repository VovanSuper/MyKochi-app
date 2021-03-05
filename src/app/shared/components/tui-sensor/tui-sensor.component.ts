import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDay, TuiDayRange, TuiDayLike, ceil } from "@taiga-ui/cdk";
import { TuiCalendarRangeComponent, tuiCreateDefaultDayRangePeriods, TUI_CALENDAR_DATA_STREAM } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import firebase from 'firebase';

import { SensorsService } from 'src/app/services/sensors.service';
import { ISensorIndication, IAirQuality } from '../../models/';

const today = new Date();
const [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDay()];

export const calendarStream$ = of(
  new TuiDayRange(new TuiDay(year, month, day), new TuiDay(year, month, day - 3)),
);

@UntilDestroy()
@Component({
  selector: 'app-tui-sensor',
  templateUrl: './tui-sensor.component.html',
  styleUrls: ['./tui-sensor.component.scss'],
  providers: [
    {
      provide: TUI_CALENDAR_DATA_STREAM,
      useValue: calendarStream$,
    },
  ],
})
export class TuiSensorComponent implements OnInit, AfterViewInit {
  @ViewChild(TuiCalendarRangeComponent) dateRange: TuiCalendarRangeComponent;
  @Input() sensorId = '';
  calItems = tuiCreateDefaultDayRangePeriods();
  sensorBtnTitle: 'Start getting Data' | 'Stop' = 'Start getting Data';
  fullSensorDateRange = [];
  loadingState: 'stopped' | 'loading' | 'processed' = 'stopped';
  fromTimestamp = firebase.firestore.Timestamp.fromMillis(Date.now()).toMillis();
  toTimestamp = firebase.firestore.Timestamp.fromMillis(Date.now() - (1000 * 60 * 60 * 24 * 2)).toMillis();

  constructor(private activeRoute: ActivatedRoute, private sensorsSvc: SensorsService) { }

  ngOnInit() {
    this.activeRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.sensorId = params['sensorID'];
      this.sensorId = this.sensorsSvc.selectedSensor;
      console.log(`[TUISensorCmp->ngOnIni()] :: sensor: ${this.sensorId}`);
    });
  }

  ngAfterViewInit() {
    const { from, to } = this.dateRange.value;
    this.fromTimestamp = firebase.firestore.Timestamp.fromDate(new Date(to.toUtcNativeDate())).toMillis();
    this.toTimestamp = firebase.firestore.Timestamp.fromDate(new Date(from.toUtcNativeDate())).toMillis();
  }

  startGetSensorData() {
    // combineLatest([
    //   this.sensorsSvc.getSensorFirstValTime(this.sensorId),
    //   this.sensorsSvc.getSensorLastValTime(this.sensorId)
    // ])
    //   .subscribe(([first, last]) => this.fullSensorDateRange = [first, last]);

    this.loadingState = 'loading';
    this.sensorsSvc.getAllSensorData(this.sensorId, { startAt: this.fromTimestamp, endAt: this.toTimestamp })
      .pipe(
        untilDestroyed(this),
        map((values: ISensorIndication[]) => {
          const times = values.map(val => val.timestamp);
          const vals = [...values.map(value => value.AirQuality)];
          return { times, vals };
        })
        // take(1)
      )
      .subscribe(
        ({ times, vals }: { times: number[], vals: IAirQuality[]; }) => {
          this.sensorValue = getDataArray(vals);
          let minMaxDates = [new Date(Math.min(...times)), new Date(Math.max(...times))];
          this.dateStamp = minMaxDates;
          this.loadingState = 'processed';
        }
      );
  }

  sensorValue = null;
  dateStamp = [];
  labelsY = ['0', '150000'];

  getHeight(max: number): number {
    return (max / ceil(max, -3)) * 100;
  }

  getRange(range: TuiDayRange) {
    const { from, to } = range;
    this.fromTimestamp = firebase.firestore.Timestamp.fromDate(new Date(from.toUtcNativeDate())).toMillis();
    this.toTimestamp = firebase.firestore.Timestamp.fromDate(new Date(to.toUtcNativeDate())).toMillis();
  }

}


const getDataArray = (data: IAirQuality[]) => {
  if (!!!data?.length) return [];

  const sensorTypes = Object.keys(data[0]);
  return data.reduce((accu = new Array(sensorTypes.length).fill([]), next: IAirQuality) => {
    sensorTypes.forEach((sensorTypeName: keyof IAirQuality) => accu[sensorTypes.indexOf(sensorTypeName)].push(next[sensorTypeName]));
    return accu;
  }, new Array(sensorTypes.length).fill([]));
};