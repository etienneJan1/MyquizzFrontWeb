import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ReponseService} from "../services/reponse.service";
import {Reponse} from "../models/Reponse";

@Component({
  selector: 'app-creation-reponse',
  templateUrl: './creation-reponse.component.html',
  styleUrls: ['./creation-reponse.component.css']
})
export class CreationReponseComponent implements OnInit {
  reponseForm: FormGroup;
  existingReponses: Reponse[] = [];
  errorMessage: string = '';
  submitted = false;

  constructor(
    private _route: ActivatedRoute,
    private reponseService: ReponseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire réactif avec le FormBuilder
    this.reponseForm = this.fb.group({
      contenu: '',
      isgood: false,
      question: ''
    });
  }

  ngOnInit() {
    this.loadExistingReponses();
  }

  // Méthode pour charger les réponses existantes pour la question spécifiée
  loadExistingReponses() {
    // Charger les réponses existantes pour la question spécifiée
    const questionId = this._route.snapshot.params['id'];
    this.reponseService.findReponsesById(questionId).subscribe(
      (reponses: Reponse[]) => {
        this.existingReponses = reponses;
      },
      (error) => {
        console.error('Erreur lors du chargement des réponses existantes', error);
      }
    );
  }

  // Méthode pour créer une nouvelle réponse
  create() {
    // Vérifier s'il y a moins de 4 réponses existantes
    if (this.existingReponses.length < 4) {
      // Récupération des données du formulaire
      const reponseData = this.reponseForm.value as Reponse;
      reponseData.question = {id: this._route.snapshot.params['id']};
      this.reponseService.create(reponseData).subscribe(() => {
        // Recharger les réponses après la création
        this.loadExistingReponses();
        this.router.navigate([`detail_question/${reponseData.question?.id}`]);
      });
    } else {
      // Affichage d'un message d'erreur si le nombre maximum de réponses est atteint
      this.errorMessage = "Impossible de créer plus de 4 réponses pour une question.";
    }
  }

  submitForm() {
    // Si le formulaire est valide alors on crée
    if (this.reponseForm.valid) {
      this.create();
    }
  }


}
