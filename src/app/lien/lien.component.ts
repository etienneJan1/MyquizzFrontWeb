import {Component, OnInit, Renderer2} from '@angular/core';
import { Location } from '@angular/common';
import {forkJoin, map, Observable} from "rxjs";
import {QuestionsService} from "../services/questions.service";
import {Questions} from "../models/Questions";
import { Router } from '@angular/router';
import {Users} from "../models/Users";


@Component({
  selector: 'app-lien',
  templateUrl: './lien.component.html',
  styleUrls: ['./lien.component.css']
})
export class LienComponent implements OnInit {

  user: Users | null = null;
  currentUrl: string | undefined;
  // Trouver les questions en fonction de leurs genres
  questions$:Observable<Questions[]> =this.questionService.findQuestionsByGenre(this.genreQuestion())
  id:bigint | undefined
  score:number=0

  constructor(
    private location: Location,
    private questionService: QuestionsService,
    private router: Router
  ) {
  }
  // Initialisation de la classe pour prendre les informations de l'utilisateur qui ont été enregistré dans le navigateur
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      console.log(this.user);
    }
    }
    // Trouver le genre de la question avec l'url en cours (renvoyer après choix_theme)
  genreQuestion(): string {
    let url = this.currentUrl = this.location.path()
    return url.substring(6);
  }

// Permet de prendre la première question, d'enregistrer localement un score, et de rediriger vers la question désirée
  getId(): void {
    forkJoin({
      lengthQuestions: this.getLengthQuestions(),
    }).subscribe(result => {
      const questions = result.lengthQuestions;
      this.id = questions.at(0)?.id;
      localStorage.setItem('score', JSON.stringify(this.score));
      this.router.navigateByUrl('/question/' + this.genreQuestion() + '/' + this.id);
    });
  }

  // Trouver les questions
  getLengthQuestions(): Observable<Questions[]> {
    return this.questions$.pipe(
      map(questions =>
        questions.filter(question => question.genre?.length)
      )
    );
  }

}
