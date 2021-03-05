import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { ChooseSensorComponent } from './components/choose-sensor/choose-sensor.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModulesModule } from './shared.modules.module';
import { TuiSensorComponent } from './components/tui-sensor/tui-sensor.component';
import { D3SensorComponent } from './components/d3-sensor/d3-sensor.component';



@NgModule({
  imports: [
    SharedModulesModule
  ],
  declarations: [
    LoginComponent,
    ChooseSensorComponent,
    HeaderComponent,
    TuiSensorComponent,
    D3SensorComponent
  ],
  exports: [
    SharedModulesModule,
    LoginComponent,
    ChooseSensorComponent,
    HeaderComponent,
    TuiSensorComponent,
    D3SensorComponent
  ]
})
export class SharedModule { }
