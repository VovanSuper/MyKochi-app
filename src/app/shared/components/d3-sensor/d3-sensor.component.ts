import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ceil, TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { tap, map } from 'rxjs/operators';
import firebase from 'firebase';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TuiCalendarRangeComponent, tuiCreateDefaultDayRangePeriods, TUI_CALENDAR_DATA_STREAM } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { generate, Data, AxesOptions, Primitive, ChartConfiguration, } from 'c3';

import { SensorsService } from 'src/app/services/sensors.service';
import { ISensorIndication, IAirQuality } from '../../models/';


const today = new Date();
const [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDay()];

export const calendarStream$ = of(
  new TuiDayRange(new TuiDay(year, month, day), new TuiDay(year, month, day - 3)),
);

@UntilDestroy()
@Component({
  selector: 'app-d3-sensor',
  templateUrl: './d3-sensor.component.html',
  styleUrls: ['./d3-sensor.component.scss'],
  providers: [
    {
      provide: TUI_CALENDAR_DATA_STREAM,
      useValue: calendarStream$,
    },
  ],
})
export class D3SensorComponent implements OnInit {
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
      console.log(`[D3SensorCmp->ngOnInit()] :: sensor: ${this.sensorId}`);
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
          let chartApi = generateChart({ bindto: 'chart', columns: getDataArray(vals) as any });
          this.sensorValue = chartApi;
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
  let results = sensorTypes.map((sensorKey, i) => [sensorKey]);

  results = data.reduce((accu: string[][], next: IAirQuality) => {
    for (let item of accu) {
      for (let key in next) {
        if (key == item[0]) {
          item.push(next[key]);
        }
      }
    }
    return accu;
  }, [...results]);
  return results;
};



const generateChart = ({ bindto, columns }: { bindto: string, columns: [string, ...Primitive[]][]; }) => {
  const opts: ChartConfiguration = {
    bindto: '#chart',
    data: {
      columns
    }
  };
  let chartData = generate(opts);

  return chartData;
};