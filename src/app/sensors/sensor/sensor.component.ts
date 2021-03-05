import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { SensorsService } from '../../services/sensors.service';

@UntilDestroy()
@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  activeItemIndex = 0;
  sensorBtnTitle: 'Start getting Data' | 'Stop' = 'Start getting Data';
  sensorId = '';
  fullSensorDateRange = [];

  constructor(private router: Router, private activeRoute: ActivatedRoute, private sensorsSvc: SensorsService) { }

  ngOnInit() {
    this.activeRoute.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.sensorId = params['id'];
      console.log(`Sensor selected:  ${this.sensorId}`);
    });
  }



  onTabClick(tabIndex: number) {
    this.activeItemIndex = tabIndex;
    const subUrl = (tabIndex == 0) ? 'tuiRoute' : 'c3Route';
    this.router.navigate([subUrl], { relativeTo: this.activeRoute, queryParams: { sensorID: this.sensorId } });
  }

}
