import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Users} from '../models/Users';
import {Router} from '@angular/router';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  email: string = '';
  user$: Observable<Users> | undefined;
  errorMessage: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  onSubmit() {
    // On réinitialise le message d'erreur
    this.errorMessage = '';
    // On vérifie si l'e-mail a été saisi puis on appelle la fonction findByMail avec l'email saisi
    if (this.email.trim() !== '') {
      this.user$ = this.userService.findByMail(this.email);
      this.user$.subscribe(
        (user) => {
          // On vérifie si l'utilisateur existe
          if (user) {
            // On stocke l'objet correspondant à l'utilisateur dans son navigateur
            localStorage.setItem('user', JSON.stringify(user));
            // On redirige vers la page de choix de thème
            this.router.navigate(['/choix_theme']);
          } else {
            // Si l'utilisateur n'est pas trouvé dans la BDD, on affiche un message d'erreur
            this.errorMessage = 'Utilisateur non trouvé.';
          }
        },
        (error) => {
          this.errorMessage = 'Erreur de requête.';
        }
      );
    } else {
      // Si l'utilisateur ne renseigne pas de mail, on affiche un message d'erreur
      this.errorMessage = 'Veuillez saisir votre adresse e-mail.';
    }
  }
}
