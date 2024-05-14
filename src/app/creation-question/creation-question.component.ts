import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionsService} from "../services/questions.service";
import {Questions} from "../models/Questions";

@Component({
  selector: 'app-creation-question',
  templateUrl: './creation-question.component.html',
  styleUrls: ['./creation-question.component.css']
})
export class CreationQuestionComponent {
  questionForm: FormGroup;
  submitted = false;
  genre = this.route.snapshot.paramMap.get('genre');

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private router: Router
  ) {
    // Initialisation du formulaire réactif avec le FormBuilder
    this.questionForm = this.fb.group({
      // Initialisation des champs du formulaire avec des valeurs par défaut
      genre: this.route.snapshot.paramMap.get('genre'), // Récupération du paramètre 'genre' de l'URL
      contenu: '',
      quizz: ''
    });
  }

  // Méthode pour créer une nouvelle question
  create() {
    // Récupération des données du formulaire
    const questionData = this.questionForm.value as Questions;
    // Ajout de l'identifiant du quiz aux données de la question à partir des paramètres de l'URL
    questionData.quizz = {id: this.route.snapshot.params['id']};
    this.questionService.create(questionData).subscribe(() => {
      this.router.navigate([`detail_quiz/${questionData.genre}/${questionData.quizz?.id}`]);
    });
  }

  submitForm() {
    // Si le formulaire est valide alors on crée
    if (this.questionForm.valid) {
      this.create();
    }
  }
}
