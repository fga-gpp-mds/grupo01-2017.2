import {
  Http, HttpModule, ConnectionBackend,
  ResponseOptions, XHRBackend, Response,
  BaseRequestOptions, RequestOptions, RequestMethod
} from '@angular/http';
import { Headers } from '@angular/http';

import { TestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import { AlertService, AuthenticationService } from '../../services/index';
import { Post } from '../../models/index';


describe('AuthenticationService', () => {
  // Defining some fake data to be used in the unit tests
  const fakeUser = {
    nomeUsuario: 'Ziegler',
    nomeCompleto: 'Ziegler Top',
    cod: 234,
    email: 'abc@abc.com'
  };

  const validFakeEmail = 'abc@abc.com';
  const validFakePassword = 'superS4f3passw0rd';
  const fakeToken = 'FakeToken';
  const fakeNullToken = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, defaultOptions: RequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        ConnectionBackend,
        AlertService,
        AuthenticationService
      ]
    });

    // Mocking localStorage
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  // For login()
  it('login () should return a valid user if data are valid',
    inject([AuthenticationService, MockBackend], (authService, mockBackend) => {
      const fakeHeader = new Headers({ appToken: fakeToken });
      const fakeData = JSON.stringify(fakeUser);

      // Mocking HTTP connection for this test
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({ body: fakeData, headers: fakeHeader });

        connection.mockRespond(new Response(options));
      });

      // Making the request
      authService.login(validFakeEmail, validFakePassword).subscribe((result) => {
        const responseToken = result[0];
        const responseBody = result[1];

        const userResponse = JSON.parse(responseBody._body);

        expect(responseToken).toEqual(fakeToken);
        expect(userResponse.cod).toEqual(fakeUser.cod);
        expect(userResponse.email).toEqual(validFakeEmail);
      });
  }));

  // For loginWithoutProfile()
  it('loginWithoutProfile() should return a valid user if data are valid',
    inject([AuthenticationService, MockBackend], (authService, mockBackend) => {
      const fakeHeader = new Headers({ appToken: fakeToken });
      const fakeData = JSON.stringify(fakeUser);

      // Mocking HTTP connection for this test
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({ body: fakeData, headers: fakeHeader });

        connection.mockRespond(new Response(options));
      });

      // Making the request
      authService.loginWithoutProfile(validFakeEmail, validFakePassword).subscribe((result) => {
        const responseToken = result[0];
        const responseBody = result[1];

        const userResponse = JSON.parse(responseBody._body);

        expect(responseToken).toEqual(fakeToken);
        expect(userResponse.cod).toEqual(fakeUser.cod);
        expect(userResponse.email).toEqual(validFakeEmail);
      });
  }));

  it('loginWithoutProfile() should call login()',
    inject([AuthenticationService, MockBackend], (authService, mockBackend) => {
      // The mocking below is needed for making the request
      const fakeHeader = new Headers({ appToken: fakeToken });
      const fakeData = JSON.stringify(fakeUser);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({ body: fakeData, headers: fakeHeader });

        connection.mockRespond(new Response(options));
      });

      const loginSpy = spyOn(authService, 'login').and.callThrough();

      // Making request and expect calling
      authService.loginWithoutProfile(validFakeEmail, validFakePassword).subscribe();
      expect(authService.login).toHaveBeenCalled();

  }));

  // For loginWithProfile()
  it('loginWithProfile() should return a valid user if data are valid',
    inject([AuthenticationService, MockBackend], (authService, mockBackend) => {
      const fakeHeader = new Headers({ appToken: fakeToken });
      const fakeData = JSON.stringify(fakeUser);

      // Mocking HTTP connection for this test
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({ body: fakeData, headers: fakeHeader });

        connection.mockRespond(new Response(options));
      });

      // Making the request
      authService.loginWithProfile(validFakeEmail, validFakePassword).subscribe((result) => {
        const responseToken = result[0];
        const responseBody = result[1];

        const userResponse = JSON.parse(responseBody._body);

        expect(responseToken).toEqual(fakeToken);
        expect(userResponse.cod).toEqual(fakeUser.cod);
        expect(userResponse.email).toEqual(validFakeEmail);
      });
  }));

  it('loginWithProfile() should call login()',
    inject([AuthenticationService, MockBackend], (authService, mockBackend) => {
      // The mocking below is needed for making the request
      const fakeHeader = new Headers({ appToken: fakeToken });
      const fakeData = JSON.stringify(fakeUser);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({ body: fakeData, headers: fakeHeader });

        connection.mockRespond(new Response(options));
      });

      const loginSpy = spyOn(authService, 'login').and.callThrough();

      // Making request and expect calling
      authService.loginWithProfile(validFakeEmail, validFakePassword).subscribe();
      expect(authService.login).toHaveBeenCalled();

  }));


  // For logout()
  it('should do logout() if there is userData', inject([AuthenticationService], (service: AuthenticationService) => {

    // Mocking LocalStorage items
    localStorage.setItem('token', 'appToken');
    localStorage.setItem('userData', JSON.stringify(fakeUser));
    localStorage.setItem('isLoggedIn', 'true');

    // Making request for logout
    service.logout();

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    expect(token).toBeNull();
    expect(userData).toBeNull();
    expect(isLoggedIn).toEqual('false');

  }));

  // For login()
  it('login() should return a valid user if data are valid',
  inject([AuthenticationService, MockBackend], (authService, mockBackend) => {
    const fakeHeader = new Headers({ appToken: fakeToken });
    const fakeData = JSON.stringify(fakeUser);

    // Mocking HTTP connection for this test
    mockBackend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({ body: fakeData, headers: fakeHeader });

      connection.mockRespond(new Response(options));
    });

    // Making the request
    authService.login(validFakeEmail, validFakePassword).subscribe((result) => {
      const responseToken = result[0];
      const responseBody = result[1];

      const userResponse = JSON.parse(responseBody._body);

      expect(responseToken).toEqual(fakeToken);
      expect(userResponse.cod).toEqual(fakeUser.cod);
      expect(userResponse.email).toEqual(validFakeEmail);
    });
  }));

  it('getToken() should return { } if there is not a response token',
  inject([AuthenticationService, MockBackend], (authService, mockBackend) => {
    const fakeHeader = new Headers({ appToken: fakeNullToken });
    const fakeData = JSON.stringify(fakeUser);

    // Mocking HTTP connection for this test
    mockBackend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({ body: fakeData, headers: fakeHeader });

      connection.mockRespond(new Response(options));
    });

    // Making the request
    authService.login(validFakeEmail, validFakePassword).subscribe((result) => {
      const responseToken = result[0];
      const responseBody = result[1];

      const userResponse = JSON.parse(responseBody._body);

      // { } is the response in case getToken() does not find a token in the
      // HTTP response
      expect(responseToken).toEqual({ });

      expect(userResponse.cod).toEqual(fakeUser.cod);
      expect(userResponse.email).toEqual(validFakeEmail);
    });
  }));

});
