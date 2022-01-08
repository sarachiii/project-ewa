 import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
 import {HttpClientTestingModule} from "@angular/common/http/testing";
 import {RouterTestingModule} from "@angular/router/testing";
 import {routes} from "../app-routing.module";

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
