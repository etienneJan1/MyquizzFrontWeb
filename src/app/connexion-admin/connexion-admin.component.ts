import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Admins} from "../models/Admins";
import {Router} from "@angular/router";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-connexion-admin',
  templateUrl: './connexion-admin.component.html',
  styleUrls: ['./connexion-admin.component.css']
})
export class ConnexionAdminComponent {
  email: string = '';
  admin$: Observable<Admins> | undefined;
  errorMessage: string | undefined;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {
  }

  onSubmit() {
    // On réinitialise le message d'erreur
    this.errorMessage = '';
    // On vérifie si l'e-mail a été saisi puis on appelle la fonction findByMail avec l'email saisi
    if (this.email.trim() !== '') {
      this.admin$ = this.adminService.findByMail(this.email);
      this.admin$.subscribe(
        // On vérifie si l'administrateur existe
        (admin) => {
          if (admin && admin.email !== undefined) {
            this.router.navigate(['/accueil_admin']);
          } else {
            // Si l'administrateur n'est pas trouvé dans la BDD, on affiche un message d'erreur
            this.errorMessage = "L'e-mail de l'administrateur est indéfini.";
          }
        },
        (error) => {
          this.errorMessage = 'Erreur de requête administrateur.';
        }
      );
    } else {
      // Si l'utilisateur ne renseigne pas de mail, on affiche un message d'erreur
      this.errorMessage = 'Veuillez saisir votre adresse e-mail.';
    }
  }

}
