import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionsService} from "../services/questions.service";
import {Location} from "@angular/common";
import {Questions} from "../models/Questions";
import {ReponseService} from "../services/reponse.service";
import {Reponse} from "../models/Reponse";
import {forkJoin, map, Observable} from "rxjs";
import {Users} from "../models/Users";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  genre: string;
  currentUrl: string | undefined;
  lastNumber: string | undefined;
  correctAnswerIndex: number | null | undefined;
  selectedAnswerIndex: number | null = null;
  color: string | undefined
  id: bigint | undefined
  user: Users | null = null;
  score: number = 0

// Trouver les questions en fonctions de leurs id
  // @ts-ignore
  question$: Observable<Questions[]> = this.questionService.findQuestionsById(BigInt(this.getId()))

  // Trouver les réponses en fonctions de leurs id
  // @ts-ignore
  reponse$: Observable<Reponse[]> = this.reponseService.findReponsesById(BigInt(this.getId()))

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionsService,
    private location: Location,
    private reponseService: ReponseService,
    private router: Router) {
    this.genre = this.route.snapshot.params['genre'];
    this.score = Number(localStorage.getItem('score'))

  }
  // Initialisation de la classe pour prendre les informations de l'utilisateur qui ont été enregistré dans le navigateur
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      console.log(this.user);
    }
  }
  // Trouver l'id de la question avec l'url en cours (renvoyer après choix_theme)
  getId(): string | undefined {
    let url = this.currentUrl = this.location.path()
    const match = url.match(/\d+$/);
    return this.lastNumber = match ? match[0] : undefined;

  }
  // Trouver le genre de la question avec l'url en cours (renvoyer après choix_theme)
  getGenre(): string | undefined {
    let url = this.currentUrl = this.location.path()
    const segments = url.split('/');
    return segments[segments.indexOf('question') + 1]
  }

  // Trouver la bonne couleur lorsqu'on clique sur une des réponses proposées
  // Couleur initial si pas de sélection
  isCorrectColor(index: number): string {
    return this.selectedAnswerIndex !== null ?
      index == this.correctAnswerIndex
        ? 'green' :
        index != this.correctAnswerIndex ?
          'red'
          : "#3363FF68" : "#3363FF68"

  }

// Fonction activée lorsqu'on clique sur une des réponses
  handleClick(index: number) {
    // Si la sélection de réponse est null
    if (this.selectedAnswerIndex === null) {
      // On sélectionne l'index choisis par l'utilisateur
      this.selectedAnswerIndex = index;
      // On cherche avec la fonction findGoodAnswerIndex, l'index de la bonne réponses dans l'api'
      this.findGoodAnswerIndex(true).subscribe(correctIndex => {
        if (index !== undefined) {
          // On insère la bonne index
          this.correctAnswerIndex = correctIndex
          console.log('Correct Answer Index:' + correctIndex)
          // Si l'index choisis par l'utilisateur est égale à la bonne index, on augmente son score
          if (index == correctIndex) {
            this.score++
            localStorage.setItem('score', JSON.stringify(this.score));
            // Sinon son score est le même
          } else {
            localStorage.setItem('score', JSON.stringify(this.score));
          }
          // On passe à la question suivante
          this.nextQuestion(index)
        }
      })
    }
  }

// Trouver l'index de la bonne réponse dans l'api
  findGoodAnswerIndex(isGood: boolean): Observable<number | undefined> {
    return this.reponse$.pipe(
      map(reponses => reponses.findIndex(reponse => reponse.isgood === isGood))
    );
  }

  // Passer à la question suivante
  nextQuestion(index: number) {
    //Attendre 1,5 le temps de voir la bonne réponse
    setTimeout(() => {
      forkJoin({
        lengthQuestions: this.searchQuestion(),
        indexCurrentQuestion: this.findQuestionIndex()
      }).subscribe(result => {
        // Prendre l'index en cours
        const currentIndex = result.indexCurrentQuestion;
        // Vérifier s'il y a une question suivante
        if (currentIndex + 1 < result.lengthQuestions.length) {
          const nextQuestion = result.lengthQuestions[currentIndex + 1];
          const nextQuestionId = nextQuestion.id;
          // Redirection vers la question suivante
          this.router.navigateByUrl('/question/' + this.getGenre() + '/' + nextQuestionId).then(() => {
            // Actualisation de la page
            window.location.reload();
          });
        } else {
          // Si aucune question suivante, rediriger vers 'choix_theme'
          this.router.navigateByUrl('/classement');
        }
      });
    }, 1500);
  }

  // Chercher une question
  searchQuestion(): Observable<Questions[]> {
    return this.questionService.findQuestionsByGenre(this.getGenre()).pipe(
    );
  }
  // Trouver l'index de la question en cours
  findQuestionIndex(): Observable<number> {
    return this.questionService.findQuestionsByGenre(this.getGenre()).pipe(
      map(questions => {
        const index = questions.findIndex(question => question.id == this.getId());
        return index >= 0 ? index : -1; // Si l'ID n'est pas trouvé, renvoie -1
      })
    );
  }


  protected readonly BigInt = BigInt;
}





