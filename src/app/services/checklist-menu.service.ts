import { Injectable } from '@angular/core';
import { FormCheck, FormCheckAnswer, FormsMenu, FormMenuTwo} from '../models/index';
import { BinaryFormCardapio } from '../models/index';
import {Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class ChecklistMenuService {

    constructor(private http: Http) {}
    private formMenuUrl = 'app/formsMenu';
    private formMenuAnswerUrl = 'app/formCheckAnswer';

    getFormsMenu(): Promise<FormCheckAnswer[]> {
        return this.http.get(this.formMenuUrl)
            .toPromise()
            .then(response => response.json().data as FormCheckAnswer[]);
    }

    // getFormsMenu(): Promise<FormCheckAnswer[]>{
    //     return Promise.resolve(FormsMenu);
    // }

    getFormsMenuTwo(): Promise<FormCheck[]> {
        return this.http.get(this.formMenuAnswerUrl)
        .toPromise()
        .then(response => response.json().data as FormCheck[]);
    }
     getBinaryFormCardapio(): Promise<BinaryFormCardapio[]> {
         return this.http.get(this.formMenuAnswerUrl)
         .toPromise()
         .then(response => response.json().data as BinaryFormCardapio[]);
     }

}
