import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { SectionCommentaryTwo } from '../../models/index';
import { BinaryForm } from '../../models/index';
import 'rxjs/add/operator/toPromise';
import { SectionCommentary, CommentBinaryForm, CommentForm, ChecklistCafeteria} from '../../models/index';


@Injectable()
export class ChecklistService {

    constructor(private http: Http) {}
    private formMenuUrl = 'app/formsMenu';
    private formMenuThree = 'app/formsThree';
    private formMenuAnswerUrl = 'app/formCheckAnswer';
    private formOneAnswerUrl = 'app/checklist';

    // checklist three services
    listAllCheck(): ChecklistCafeteria[] {
        const ChecklistCafeteria = localStorage['ChecklistCafeteria'];
        return ChecklistCafeteria ? JSON.parse(ChecklistCafeteria) : [];
    }

    newCheck(checkThree: ChecklistCafeteria): void {
        const ChecklistCafeteria = this.listAllCheck();
        checkThree.id = new Date().getTime();
        ChecklistCafeteria.push(checkThree);
        localStorage['ChecklistCafeteria'] = JSON.stringify(ChecklistCafeteria);
    }

    // checklist 2 services
    getFormsMenu(): Promise<CommentBinaryForm[]> {
        return this.http.get(this.formMenuUrl)
            .toPromise()
            .then(response => response.json().data as CommentBinaryForm[]
        );
    }

    getFormsThree(): Promise<SectionCommentaryTwo[]> {
      return this.http.get(this.formMenuThree)
          .toPromise()
          .then(response => response.json().data as SectionCommentaryTwo[]
      );
    }
}

