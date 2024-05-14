import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../models/Users";
import {Admins} from "../models/Admins";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  private userUrl = "http://localhost:8080/admins"

// Trouver l'email d'un administrateur
  findByMail(email: String): Observable<Admins> {
    return this.http.get<Admins>(`${this.userUrl}/email/${email}`)
  }
}
