import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from "@taiga-ui/core";

import { SensorsRoutingModule } from './sensors-routing.module';
import { SensorsComponent } from './sensors.component';
import { SensorComponent } from './sensor/sensor.component';
import { SharedModule } from '../shared/shared.module';
import { SharedModulesModule } from '../shared/shared.modules.module';


@NgModule({
  imports: [
    SensorsRoutingModule,
    SharedModule
  ],
  declarations: [SensorsComponent, SensorComponent],
})
export class SensorsModule { }
