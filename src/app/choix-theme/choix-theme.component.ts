import {Component, OnInit} from '@angular/core';
import {QuizzService} from "../services/quizz.service";
import {Observable} from "rxjs";
import {Quizz} from "../models/Quizz";
import {Users} from "../models/Users";

@Component({
  selector: 'app-choix-theme',
  templateUrl: './choix-theme.component.html',
  styleUrls: ['./choix-theme.component.css']
})
export class ChoixThemeComponent implements OnInit {
  user: Users | null = null;
  // Trouver tous les quizz pour pouvoir trouver le genre/thème
  theme$: Observable<Quizz[]> = this.quizzService.findAll()
  constructor(
    private quizzService: QuizzService,
  ) {
  }
  // Initialisation de la classe pour prendre les informations de l'utilisateur qui ont été enregistré dans le navigateur
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }

  }

}
