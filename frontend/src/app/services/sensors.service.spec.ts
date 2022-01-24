import {TestBed} from '@angular/core/testing';

import {SensorsService} from './sensors.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";
import {SensorData} from "../models/sensor-data";

describe('SensorsService', () => {
  let service: SensorsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensorsService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SensorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get desired sensor values', () => {
    // Arrange
    // Mock the greenhouse id and limit
    const mockGhId: number = 2;
    const mockLimit: number = 9;

    // Create dummy data and a timestamp
    const dummySensorData: SensorData[] = [];
    const timestamp = new Date();

    for (let i = 0; i < mockLimit; i++) {
      dummySensorData.push(new SensorData(timestamp, mockGhId, i + 1, Math.random() * 100))
    }
    // Setup URL
    const resourceUrl = new URL(environment.apiUrl);

    // Act: Request the desired values of the mock greenhouse id
    service.getDesiredValues(mockGhId, mockLimit).toPromise().then((sensorData) => {
      for (let i = 0; i < sensorData.length; i++) {
        expect(sensorData[i]).toBeInstanceOf(SensorData);
        expect(sensorData[i].ghId).toEqual(mockGhId);
        expect(sensorData[i].timestamp).toEqual(timestamp);
        expect(sensorData[i].sensorId).toEqual(dummySensorData[i].sensorId);
        expect(sensorData[i].value).toEqual(dummySensorData[i].value);
      }
    })

    // Assert: URL and method
    const req = httpMock.expectOne(`${resourceUrl}sensors/data/db?id=${mockGhId}&limit=${mockLimit}`);
    expect(req.request.method).toBe('GET');

    req.flush(dummySensorData)
  });
});
