import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../models/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private userUrl = "http://localhost:8080/users"

  private currentUser: Users | null = null;

  // Setter pour modifier l'utilisateur en cours
  setCurrentUser(user: Users | null): void {
    this.currentUser = user;
  }

  getCurrentUser(): Users | null {
    return this.currentUser;
  }

  // Deconnexion fonction
  logout(): void {
    // Déconnexion : supprimer l'utilisateur du localStorage
    localStorage.removeItem('user');
    // Réinitialiser l'utilisateur dans le service
    this.setCurrentUser(null);
  }

  // Supprimer utilisateur
  delete(id: bigint | undefined): Observable<{}> {
    return this.http.delete(`${this.userUrl}/${id}`, { responseType: 'text' });
  }

  // Trouver un utilisateur en fonction de l'ID
  findById(id: bigint): Observable<Users> {
    return this.http.get<Users>(`${this.userUrl}/${id}`)
  }

  // Mettre à jour un utilisateur
  update(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.userUrl}`, user);
  }

  // Créer un utilisateur
  create(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.userUrl}`, user);
  }

  // Trouver tous les utilisateurs
  findAll() : Observable<Users[]> {
    return this.http.get<Users[]>(this.userUrl )
  }

  // Trouver mail d'un utilisateur
  findByMail(email: String): Observable<Users>{
    return this.http.get<Users>(`${this.userUrl}/email/${email}`)
  }
}
