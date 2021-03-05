import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3SensorComponent } from './d3-sensor.component';

describe('D3SensorComponent', () => {
  let component: D3SensorComponent;
  let fixture: ComponentFixture<D3SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3SensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
