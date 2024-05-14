import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Reponse} from "../models/Reponse";
import {ReponseService} from "../services/reponse.service";

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.css']
})
export class DetailQuestionComponent {

  questionId: bigint = this._route.snapshot.params['id'];
  reponse$: Observable<Reponse[]> = this.reponseService.findReponsesById(this.questionId)

  constructor(
    private reponseService: ReponseService,
    private _route: ActivatedRoute,
  ) {
  }

  // Méthode pour rediriger vers l'édition d'une question
  redirectToEditQuestion() {
    // Conversion de l'identifiant de la question en BigInt
    const questionIdBigInt = BigInt(this.questionId);

    // Stockage de l'identifiant de la question dans le localStorage
    localStorage.setItem('questionId', questionIdBigInt.toString());
  }

}
