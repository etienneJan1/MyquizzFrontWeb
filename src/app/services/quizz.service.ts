import { Injectable } from '@angular/core';
import {Observable} from "rxjs"
import { HttpClient } from "@angular/common/http"
import {Quizz} from "../models/Quizz";

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(private http: HttpClient) {
  }
  private quizzUrl = "http://localhost:8080/quizz"
  // Trouver tous les quizz
  findAll(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this.quizzUrl)
  }

  // Supprimer un quizz
  delete(id: bigint | undefined): Observable<{}> {
    return this.http.delete(`${this.quizzUrl}/${id}`, { responseType: 'text' });
  }

  // Trouver l'ID d'un quizz
  findById(id: bigint) : Observable<Quizz> {
    return this.http.get<Quizz>(`${this.quizzUrl}/${id}`)
  }

  // Mettre à jour un quizz
  update(quizz: Quizz): Observable<Quizz> {
    return this.http.post<Quizz>(`${this.quizzUrl}`, quizz);
  }

  // Créer un quizz
  create(quiz: Quizz): Observable<Quizz> {
    return this.http.post<Quizz>(`${this.quizzUrl}`, quiz);
  }

}
