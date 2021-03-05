import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuiSensorComponent } from './tui-sensor.component';

describe('TuiSensorComponent', () => {
  let component: TuiSensorComponent;
  let fixture: ComponentFixture<TuiSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuiSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuiSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
