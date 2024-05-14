import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Reponse} from "../models/Reponse";
import {ReponseService} from "../services/reponse.service";

@Component({
  selector: 'app-edit-reponse',
  templateUrl: './edit-reponse.component.html',
  styleUrls: ['./edit-reponse.component.css']
})
export class EditReponseComponent implements OnInit {

  reponseForm: FormGroup;
  // Observable pour stocker les détails de la réponse à éditer
  reponse$: Observable<Reponse> = this.reponseService.findById(this._route.snapshot.params['id']);
  questionId: bigint | null = null;

  constructor(
    private _route: ActivatedRoute,
    private reponseService: ReponseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Récupération de l'identifiant de la question à partir du localStorage
    const questionIdString = localStorage.getItem('questionId');
    if (questionIdString !== null) {
      // Conversion de la valeur stockée en bigint
      this.questionId = BigInt(questionIdString);
    }
    // Initialisation du formulaire réactif
    this.reponseForm = this.fb.group({
      contenu: '',
      isgood: false,
      question: ''
    });
  }

  ngOnInit(): void {
    const reponseId: bigint = this._route.snapshot.params['id'];
    // Appel du service pour récupérer les détails de la réponse
    this.reponseService.findById(reponseId).subscribe((reponse: Reponse) => {
      // Mise à jour des valeurs du formulaire réactif avec les détails de la réponse
      this.reponseForm.patchValue({
        contenu: reponse.contenu,
        isgood: reponse.isgood
      });
    });
  }

  // Méthode pour supprimer une réponse
  deleteReponse(): void {
    const reponseId: bigint = this._route.snapshot.params['id'];
    // Récupération de l'identifiant de la question depuis le localStorage
    const questionId = localStorage.getItem('questionId');
    // Appel du service pour supprimer la réponse
    this.reponseService.delete(reponseId).subscribe(() => {
      this.router.navigate([`detail_question/${questionId}`]).then(() => {
        // Rechargement de la page après la suppression
        window.location.reload();
      });
    });

  }

  // Méthode pour enregistrer les modifications apportées à la réponse
  save(reponse: Reponse) {
    // Récupération de l'identifiant de la question depuis le localStorage
    const questionId = localStorage.getItem('questionId');
    // Appel du service pour mettre à jour la réponse
    this.reponseService.update(reponse).subscribe(() => {
      this.router.navigate([`detail_question/${questionId}`])
    })
  }
}
