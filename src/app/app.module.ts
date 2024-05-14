import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {ChoixThemeComponent} from './choix-theme/choix-theme.component';
import {LienComponent} from './lien/lien.component';
import {ClassementComponent} from './classement/classement.component';
import {QuestionsComponent} from './questions/questions.component';
import {HttpClientModule} from "@angular/common/http";
import {AccueilAdminComponent} from './accueil-admin/accueil-admin.component';
import {ChoixThemeAdminComponent} from './choix-theme-admin/choix-theme-admin.component';
import {CreationQuizComponent} from './creation-quiz/creation-quiz.component';
import {GestionQuizComponent} from './gestion-quiz/gestion-quiz.component';
import {GestionUserComponent} from './gestion-user/gestion-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConnexionComponent} from "./connexion/connexion.component";
import {NavbarAdminComponent} from './navbar-admin/navbar-admin.component';
import {DetailQuestionComponent} from './detail-question/detail-question.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {NavbarUserComponent} from './navbar-user/navbar-user.component';

import {CreationUserComponent} from './creation-user/creation-user.component';
import {PageAccueilComponent} from "./page-accueil/page-accueil.component";
import { ConnexionAdminComponent } from './connexion-admin/connexion-admin.component';

import { CreationQuestionComponent } from './creation-question/creation-question.component';
import { CreationReponseComponent } from './creation-reponse/creation-reponse.component';
import {InscriptionComponent} from './inscription/inscription.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { EditReponseComponent } from './edit-reponse/edit-reponse.component';
import {DetailQuizComponent} from "./detail-quiz/detail-quiz.component";


@NgModule({
  declarations: [
    AppComponent,
    ChoixThemeComponent,
    ConnexionComponent,
    LienComponent,
    ClassementComponent,
    QuestionsComponent,
    AccueilAdminComponent,
    ChoixThemeAdminComponent,
    CreationQuizComponent,
    GestionQuizComponent,
    QuestionsComponent,
    AccueilAdminComponent,
    ChoixThemeAdminComponent,
    CreationQuizComponent,
    GestionQuizComponent,
    GestionUserComponent,
    NavbarAdminComponent,
    DetailQuestionComponent,
    EditUserComponent,
    NavbarUserComponent,
    CreationUserComponent,
    DetailQuizComponent,
    CreationQuestionComponent,
    CreationReponseComponent,
    InscriptionComponent,
    EditQuestionComponent,
    EditReponseComponent,

    DetailQuizComponent,
    CreationQuestionComponent,
    CreationReponseComponent,
    InscriptionComponent,
    EditQuestionComponent,
    EditReponseComponent,

    InscriptionComponent,
    PageAccueilComponent,
    ConnexionAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
