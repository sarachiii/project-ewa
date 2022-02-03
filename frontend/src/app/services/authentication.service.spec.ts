import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {WebStorageService} from "./storage/web-storage.service";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let webStorage: WebStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthenticationService);
    webStorage = TestBed.inject(WebStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('Instances should be created ', () => {
    expect(service).toBeTruthy();
  });

  it('The token should be stored in the webstorage if the response contains a authorization field', () => {
    // Arrange
    const resourceUrl = environment.apiUrl;
    const dummyToken = 'token';
    const dummyEmail = '';
    const dummyPassword = '';


    // Act
    service.authenticateToken(dummyEmail, dummyPassword).subscribe(() => {
      // Assert: webStorage should now have a token
      expect(webStorage.get("token")).toEqual("token");
    });

    // Assert
    const req = httpMock.expectOne(resourceUrl + '/auth/login');
    req.flush(new User(), {headers: {Authorization: dummyToken}})

  });
});
