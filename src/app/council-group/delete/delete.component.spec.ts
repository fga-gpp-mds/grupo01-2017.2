import { Observable } from 'rxjs/Observable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, ConnectionBackend, RequestOptions, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import 'rxjs/add/observable/throw';


import { CouncilGroupDeleteComponent } from './delete.component';
import {
  CouncilGroupService,
  AlertService,
  ProfileService,
  UserService,
  AuthenticationService,
  NotificationService } from '../../services/index';
import { CouncilGroup, Notification } from '../../models/index';


describe('CouncilGroupDeleteComponent', () => {
  let component: CouncilGroupDeleteComponent;
  let fixture: ComponentFixture<CouncilGroupDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CouncilGroupDeleteComponent,
      ],
      providers: [
        CouncilGroupService,
        AlertService,
        ProfileService,
        UserService,
        AuthenticationService,
        NotificationService
      ],
      imports: [
        HttpModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
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
  }));

  beforeEach(() => {
    localStorage.setItem('token', 'sdas');
    fixture = TestBed.createComponent(CouncilGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a value from getCouncilGroups', () => {
    const service = fixture.debugElement.injector.get(CouncilGroupService);
    const fakeResOptions = new ResponseOptions({ body: { 'nada': 'teste' } });
    const fakeRes = new Response(fakeResOptions);
    const loginSpy = spyOn(service, 'getCouncilGroups').and.returnValue(
      Observable.of(fakeRes)
    );

    fixture.detectChanges();
    component.getAll();
    expect(component.councils).toBeDefined();
  });

  it('should throw 204 in getCouncilGroups service', () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    const service = fixture.debugElement.injector.get(CouncilGroupService);
    const fakeResOptions = new ResponseOptions({ status: 204 });
    const fakeRes = new Response(fakeResOptions);
    const loginSpy = spyOn(service, 'getCouncilGroups').and.returnValue(
      Observable.throw(204)
    );
    console.log(service.getCouncilGroups());
    const alertSpy = spyOn(alertService, 'warn');
    fixture.detectChanges();
    component.getAll();

    expect(alertService.warn).toHaveBeenCalledWith('Nenhum agendamento encontrada!');
  });

  it('should throw 400 in getCouncilGroups service', () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    const service = fixture.debugElement.injector.get(CouncilGroupService);
    const fakeResOptions = new ResponseOptions({ status: 204 });
    const fakeRes = new Response(fakeResOptions);
    const loginSpy = spyOn(service, 'getCouncilGroups').and.returnValue(
      Observable.throw(400)
    );
    console.log(service.getCouncilGroups());
    const alertSpy = spyOn(alertService, 'error');
    fixture.detectChanges();
    component.getAll();
    expect(alertService.error).toHaveBeenCalledWith('Erro de requisição!');
  });

  it('should throw 500 in getCouncilGroups service', () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    const service = fixture.debugElement.injector.get(CouncilGroupService);
    const fakeResOptions = new ResponseOptions({ status: 204 });
    const fakeRes = new Response(fakeResOptions);
    const loginSpy = spyOn(service, 'getCouncilGroups').and.returnValue(
      Observable.throw(500)
    );
    console.log(service.getCouncilGroups());
    const alertSpy = spyOn(alertService, 'error');
    fixture.detectChanges();
    component.getAll();
    expect(alertService.error).toHaveBeenCalledWith('Erro no servidor!');
  });

  it('should set token item in localStorage', () => {
    localStorage.clear();
    const alertService = fixture.debugElement.injector.get(AlertService);
    const alertSpy = spyOn(alertService, 'warn');
    fixture.detectChanges();
    component.getAll();
    expect(alertService.warn).toHaveBeenCalledWith('Você precisa estar logado');
    localStorage.setItem('token', 'sdas');
  });

  it('should delete a council', () => {
    const service = fixture.debugElement.injector.get(CouncilGroupService);
    const fakeResOptions = new ResponseOptions({ body: { 'nada': 'teste' } });
    const fakeRes = new Response(fakeResOptions);
    const loginSpy = spyOn(service, 'deleteCouncil').and.returnValue(
      Observable.of(fakeRes)
    );

    fixture.detectChanges();
    component.deleteCouncil(10);
    expect(component.councils).toBeDefined();
  });

  it('should throw 204 in deleteCouncil service', () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    const service = fixture.debugElement.injector.get(CouncilGroupService);
    const fakeResOptions = new ResponseOptions({ status: 204 });
    const fakeRes = new Response(fakeResOptions);
    const loginSpy = spyOn(service, 'deleteCouncil').and.returnValue(
      Observable.throw(204)
    );
    console.log(service.getCouncilGroups());
    const alertSpy = spyOn(alertService, 'warn');
    fixture.detectChanges();
    component.deleteCouncil(10);

    expect(alertService.warn).toHaveBeenCalledWith('Nenhum agendamento encontrada!');
  });

  it('should throw 400 in deleteCouncil service', () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    const service = fixture.debugElement.injector.get(CouncilGroupService);
    const fakeResOptions = new ResponseOptions({ status: 204 });
    const fakeRes = new Response(fakeResOptions);
    const loginSpy = spyOn(service, 'deleteCouncil').and.returnValue(
      Observable.throw(400)
    );
    console.log(service.getCouncilGroups());
    const alertSpy = spyOn(alertService, 'error');
    fixture.detectChanges();
    component.deleteCouncil(10);
    expect(alertService.error).toHaveBeenCalledWith('Erro de requisição!');
  });
  it('should throw 500 in deleteCouncil service', () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    const service = fixture.debugElement.injector.get(CouncilGroupService);
    const fakeResOptions = new ResponseOptions({ status: 204 });
    const fakeRes = new Response(fakeResOptions);
    const loginSpy = spyOn(service, 'deleteCouncil').and.returnValue(
      Observable.throw(500)
    );
    console.log(service.getCouncilGroups());
    const alertSpy = spyOn(alertService, 'error');
    fixture.detectChanges();
    component.deleteCouncil(10);
    expect(alertService.error).toHaveBeenCalledWith('Erro no servidor!');
  });
});
