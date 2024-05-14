import {Component} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Quizz} from '../models/Quizz';
import {QuizzService} from '../services/quizz.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-gestion-quiz',
  templateUrl: './gestion-quiz.component.html',
  styleUrls: ['./gestion-quiz.component.css']
})
export class GestionQuizComponent {

  // Observable pour stocker la liste des quizzes
  quizz$: Observable<Quizz[]> = this.quizzService.findAll();

  constructor(
    private quizzService: QuizzService,
    private _route: ActivatedRoute,
    private router: Router,
  ) {
  }

  // Méthode pour supprimer un quiz
  deleteQuiz(quizz: Quizz): void {
    if (quizz.id !== undefined) {
      // Conversion de l'identifiant du quiz en bigint
      const QuizzId: bigint = BigInt(quizz.id);
      // Appel du service pour supprimer le quiz
      this.quizzService.delete(QuizzId).subscribe(() => {
        // Filtrer les quizzes pour exclure celui qui vient d'être supprimé
        this.quizz$ = this.quizz$.pipe(
          map(quizzes => quizzes.filter(q => q.id !== quizz.id))
        );
      });
    }
  }

}
