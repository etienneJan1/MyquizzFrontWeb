import {Component} from '@angular/core';
import {Users} from "../models/Users";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent {

  // Observable pour stocker la liste des utilisateurs
  user$: Observable<Users[]> = this.userService.findAll()

  constructor(
    private userService: UserService,
  ) {
  }

}
