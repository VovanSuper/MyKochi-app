import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSensorComponent } from './choose-sensor.component';

describe('ChooseSensorComponent', () => {
  let component: ChooseSensorComponent;
  let fixture: ComponentFixture<ChooseSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
