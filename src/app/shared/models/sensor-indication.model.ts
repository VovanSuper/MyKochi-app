export interface ISensorIndication {
  timestamp: number;
  AirQuality: IAirQuality;
}

export interface IAirQuality {
  CO2: number;
  gasResistance: number;
  Humidity: number;
  IAQ: number;
  PM1: number;
  PM10: number;
  PM2_5: number;
  PM4: number;
  Pressure: number;
  Temperature: number;
}

export const testSensorId = 'testfcf5c42aff80';
