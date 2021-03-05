import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SensorsService } from 'src/app/services/sensors.service';
import { testSensorId } from '../../models/';

@Component({
  selector: 'app-choose-sensor',
  templateUrl: './choose-sensor.component.html',
  styleUrls: ['./choose-sensor.component.scss']
})
export class ChooseSensorComponent implements OnInit {
  @Output('sensorIdSelected') sensorIdSelected: EventEmitter<string> = new EventEmitter();
  sensorBtnTitle: 'Start getting Data' | 'Stop' = 'Start getting Data';
  fullSensorDateRange = [];;
  items = [
    testSensorId,
  ];

  selectedSensorId = null;

  sensorSelectForm: FormGroup;

  constructor(private router: Router, private sensorSvc: SensorsService) { }

  ngOnInit() {
    this.sensorSelectForm = new FormGroup({
      sensor: new FormControl(this.items[0], Validators.required),
    });
  }

  sensorSelected(sensorId) {
    console.log('Sensor Selected: ', sensorId);
    this.selectedSensorId = sensorId;
  }

  navigateToSensor() {
    if (this.sensorSelectForm.valid && !!this.sensorSelectForm.value) {
      const sensorVal = this.sensorSelectForm.get('sensor').value;
      console.log({ sensorVal });
      this.sensorIdSelected.emit(sensorVal);
      this.sensorSvc.setSelectedSensor(sensorVal);
      this.router.navigate(['sensors', sensorVal]);
    }
  }

}
