import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Questions} from "../models/Questions";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../services/questions.service";

@Component({
  selector: 'app-detail-quiz',
  templateUrl: './detail-quiz.component.html',
  styleUrls: ['./detail-quiz.component.css']
})
export class DetailQuizComponent {
  // Récupération des paramètres de l'URL à partir du snapshot de l'activatedRoute
  quizGenre: string = this._route.snapshot.params['genre'];
  quizId: string = this._route.snapshot.params['id'];
  // Observable pour stocker les questions associées au genre du quiz
  quizz$: Observable<Questions[]> = this.questionsService.findQuestionsByGenre(this.quizGenre)

  constructor(
    private questionsService: QuestionsService,
    private _route: ActivatedRoute,
  ) {
  }
}
