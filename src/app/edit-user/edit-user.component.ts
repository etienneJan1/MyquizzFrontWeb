import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Users} from "../models/Users";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  // Observable pour stocker les détails de l'utilisateur à éditer
  user$: Observable<Users> = this.userService.findById(this._route.snapshot.params['id']);

  constructor(
    private _route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire réactif avec des champs vides par défaut
    this.userForm = this.fb.group({
      pseudo: [''],
      email: [''],
      score: ['']
    });
  }

  ngOnInit(): void {
    const userId: bigint = this._route.snapshot.params['id'];
    // Appel du service pour récupérer les détails de l'utilisateur
    this.userService.findById(userId).subscribe((user: Users) => {
      // Mise à jour des valeurs du formulaire réactif avec les détails de l'utilisateur
      this.userForm.patchValue({
        pseudo: user.pseudo,
        email: user.email,
        score: user.score
      });
    });
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(): void {
    const userId: bigint = this._route.snapshot.params['id'];
    // Appel du service pour supprimer l'utilisateur
    this.userService.delete(userId).subscribe(() => this.router.navigate(["gestion_user"]).then(() => {
      // Rechargement de la page après la suppression
      window.location.reload();
    }));
  }

  // Méthode pour enregistrer les modifications apportées à l'utilisateur
  save(user: Users) {
    // Appel du service pour mettre à jour l'utilisateur
    this.userService.update(user).subscribe(() => {
      this.router.navigate(["gestion_user"])
    })
  }

}
