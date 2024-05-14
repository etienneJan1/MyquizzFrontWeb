import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../models/Users';
import {Router} from '@angular/router';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  userForm: FormGroup;
  // Variable pour suivre si le formulaire a été soumis
  submitted = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire réactif avec des validateurs
    this.userForm = this.fb.group({
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      score: [0],
    });
  }

  // Méthode pour créer un nouvel utilisateur
  create() {
    const userData = this.userForm.value as Users;
    // Appel du service pour créer l'utilisateur
    this.userService.create(userData).subscribe(() => {
      // Redirection vers la page d'accueil après la création de l'utilisateur
      this.router.navigate(['connexion']);
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  submitForm() {
    // Marquer le formulaire comme soumis
    this.submitted = true;
    // Vérifier si le formulaire est valide
    if (this.userForm.valid) {
      this.create();
    }
  }
}
