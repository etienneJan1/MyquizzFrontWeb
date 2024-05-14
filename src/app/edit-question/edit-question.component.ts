import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Questions} from "../models/Questions";
import {QuestionsService} from "../services/questions.service";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  questionForm: FormGroup;
  // Observable pour stocker les détails de la question à éditer
  question$: Observable<Questions> = this.questionsService.findById(this._route.snapshot.params['id']);

  constructor(
    private _route: ActivatedRoute,
    private questionsService: QuestionsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire réactif
    this.questionForm = this.fb.group({
      genre: this._route.snapshot.paramMap.get('genre'),
      contenu: '',
      quizz: ''
    });
  }

  ngOnInit(): void {
    // Récupération de l'identifiant de la question depuis les paramètres de l'URL
    const userId: bigint = this._route.snapshot.params['id'];
    // Appel du service pour récupérer les détails de la question
    this.questionsService.findById(userId).subscribe((question: Questions) => {
      // Mise à jour des valeurs du formulaire réactif avec les détails de la question
      this.questionForm.patchValue({
        genre: question.genre,
        contenu: question.contenu
      });
    });
  }

  // Méthode pour supprimer une question
  deleteQuestion(): void {
    const questionData = this.questionForm.value as Questions;
    const questionId: bigint = this._route.snapshot.params['id'];
    // Appel du service pour supprimer la question
    this.questionsService.delete(questionId).subscribe(() => this.router.navigate([`detail_quiz/${questionData.genre}/${questionId}`]).then(() => {
      // Rechargement de la page après la suppression pour avoir la BDD actualisée
      window.location.reload();
    }));
  }

  // Méthode pour enregistrer les modifications apportées à la question
  save(question: Questions) {
    const questionData = this.questionForm.value as Questions;
    const questionId: bigint = this._route.snapshot.params['id'];
    // Appel du service pour mettre à jour la question
    this.questionsService.update(question).subscribe(() => {
      this.router.navigate([`detail_quiz/${questionData.genre}/${questionId}`])
    })
  }
}
