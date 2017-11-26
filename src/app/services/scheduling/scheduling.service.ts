import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { UserService } from '../user/user.service';
import { AlertService } from '../alert/alert.service';
import { ServicesUtilitiesService } from '../services-utilities/services-utilities.service';
import { Post, User, Scheduling } from '../../models/index';

@Injectable()
export class SchedulingService extends ServicesUtilitiesService {

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'appIdentifier': 462,
    'appToken': localStorage.getItem('token')
  });

  options: RequestOptions = new RequestOptions({ headers: this.headers });

  private baseURL = 'http://mobile-aceite.tcu.gov.br:80/appCivicoRS/rest/postagens/conteudos';
  private url = 'http://mobile-aceite.tcu.gov.br:80/appCivicoRS/rest/postagens';

  constructor(private http: Http,
    private alertService: AlertService,
    private userService: UserService,
  ) {
    super();
  }

  getSchedulings(): Observable<Scheduling> {
    const thereIsToken = localStorage.getItem('token');
    if (thereIsToken) {
      return this.http.get(this.baseURL, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      this.alertService.warn('Você precisa estar logado');
    }
  }

  newScheduling(scheduling: Scheduling, postType: number, postText: string): Observable<Scheduling> {

    const cod = this.userService.getUserCod();
    const sched = JSON.stringify(scheduling);
    const body = {
      'conteudo': {
        'JSON': sched,
        'texto': postText,
        'valor': 0
      },
      'postagem': {
        'autor': {
          'codPessoa': cod
        },
        'tipo': {
          'codTipoPostagem': postType
        }
      }
    };

    return this.http.post(this.baseURL, JSON.stringify(body), this.options)
    .map(result => this.extractData(result))
    .catch(this.handleError);
  }

  delete(codPost: Number, codContent: Number): any {
    const token = localStorage.getItem('token');
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'appToken': token
    });
    const options: RequestOptions = new RequestOptions({ headers: headers });
    const url = this.url + '/' + codPost + '/conteudos/' + codContent;
    return this.http.delete(url, options)
      .map(result => this.extractData(result))
      .catch(this.handleError);
  }

}
