import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../environments/environment";
import { LanguageCode, Preferences } from "../models/preferences";

describe('SettingsService', () => {
  let service: SettingsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsService]
    });
    service = TestBed.inject(SettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Test 0: should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * @author Hashim Mohammad
   */
  it('Test 1: Update account information', () => {
    // Arrange
    // Mock the user id
    const mockUserId: number = 0;
    // Setup URL
    const resourceUrl = new URL(environment.apiUrl);
    // Create dummy account data
    const dummyData = {
      firstName: 'First name',
      lastName: 'Last name',
      file: '',
      emailAddress: 'email@address.com',
      password: 'password',
      newPasswordForm: {
        password: '',
        confirmPassword: ''
      },
      deleteProfilePicture: false
    };
    // Convert dummy data to blob
    const jsonBlob = new Blob([JSON.stringify(dummyData)], {type: 'application/json'});
    const accountForm = new FormData();
    accountForm.set('accountForm', jsonBlob);
    accountForm.set('file', null);

    // Act: Call method from the service with the mock data
    service.updateProfile(mockUserId, accountForm).subscribe((res) => {
      // Assert: Confirm response is true
      expect(res).toBeTrue();
    });

    // Assert: URL and body
    const req = httpMock.expectOne(`${resourceUrl}/users/${mockUserId}/account`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(accountForm);

    // Act: Send response
    req.flush(true);
  });

  /**
   * @author Hashim Mohammad
   */
  it('Test 2: Get user preferences', () => {
    // Arrange
    // Mock the user id
    const mockUserId: number = 0;
    // Setup URL
    const resourceUrl = new URL(environment.apiUrl);
    // Create dummy preferences
    const dummyData: Preferences = new Preferences(mockUserId, LanguageCode.en_GB, false, false);

    // Act: Request the preferences of mock user with id mockUserId
    service.getPrefs(mockUserId).subscribe((res) => {
      // Assert: Response has to be an instance of Preferences
      expect(res).toBeInstanceOf(Preferences);
      // Assert: Make sure response is correct
      expect(res.userId).toEqual(mockUserId);
      expect(res.languageCode).toEqual(LanguageCode.en_GB);
      expect(res.colorblindness).toBeFalse();
      expect(res.darkMode).toBeFalse();
    });

    // Assert: URL and method
    const req = httpMock.expectOne(`${resourceUrl}/users/preferences?id=${mockUserId}`);
    expect(req.request.method).toBe('GET');

    // Act: Send response
    req.flush(dummyData);
  });
});
