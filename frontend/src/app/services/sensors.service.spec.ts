import { TestBed } from '@angular/core/testing';

import { SensorsService } from './sensors.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SensorsService', () => {
  let service: SensorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensorsService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SensorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
