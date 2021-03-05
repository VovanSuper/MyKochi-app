import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorsService } from '../services/sensors.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent {

  constructor(private router: Router, private sensorsSvc: SensorsService) { }

  selectSensor(sensorId: string) {
    this.sensorsSvc.setSelectedSensor(sensorId);
    return this.router.navigateByUrl(`/sensors/${sensorId}`);
  }
}
