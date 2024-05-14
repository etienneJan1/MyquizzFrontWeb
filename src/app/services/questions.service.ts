import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Questions} from "../models/Questions";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) {
  }
  private questionUrl = "http://localhost:8080/questions"
  // Trouver toutes les questions
  findAll() : Observable<Questions[]> {
    return this.http.get<Questions[]>(this.questionUrl )
  }

  // Trouver une question en fonction de son ID
  findById(id: bigint) : Observable<Questions> {
    return this.http.get<Questions>(`${this.questionUrl}/${id}`)
  }

  // Trouver les questions en fonction de leurs ID
  findQuestionsById(id: bigint | undefined): Observable<Questions[]> {
    return this.http.get<Questions[]>(this.questionUrl + `/byId/${(id)}`)
  }

  // Trouver les questions en fonction de leurs genres
  findQuestionsByGenre(genre: string | undefined): Observable<Questions[]> {
        return this.http.get<Questions[]>(this.questionUrl + `/byGenre/${(genre)}`)
    }

    //Créer une question
  create(question: Questions): Observable<Questions> {
    return this.http.post<Questions>(`${this.questionUrl}`, question);
  }
  // Mettre à jour une question
  update(question: Questions): Observable<Questions> {
    return this.http.post<Questions>(`${this.questionUrl}`, question);
  }

  // Supprimer une question
  delete(id: bigint | undefined): Observable<{}> {
    return this.http.delete(`${this.questionUrl}/${id}`, { responseType: 'text' });
  }


}
