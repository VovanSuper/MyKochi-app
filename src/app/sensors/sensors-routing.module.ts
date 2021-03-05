import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D3SensorComponent } from '../shared/components/d3-sensor/d3-sensor.component';
import { TuiSensorComponent } from '../shared/components/tui-sensor/tui-sensor.component';
import { SensorComponent } from './sensor/sensor.component';
import { SensorsComponent } from './sensors.component';

const routes: Routes = [
  { path: '', component: SensorsComponent, pathMatch: 'full' },
  {
    path: ':id', component: SensorComponent, children: [
      { path: 'c3Route',  component: D3SensorComponent },
      { path: 'tuiRoute',  component: TuiSensorComponent },
      { path: '', redirectTo: 'tuiRoute', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorsRoutingModule { }
