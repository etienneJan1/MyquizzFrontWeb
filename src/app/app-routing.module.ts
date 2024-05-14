import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {ConnexionComponent} from "./connexion/connexion.component";
import {ChoixThemeComponent} from "./choix-theme/choix-theme.component";
import {LienComponent} from "./lien/lien.component";
import {ClassementComponent} from "./classement/classement.component";
import {QuestionsComponent} from "./questions/questions.component";
import {AccueilAdminComponent} from "./accueil-admin/accueil-admin.component";
import {GestionQuizComponent} from "./gestion-quiz/gestion-quiz.component";
import {GestionUserComponent} from "./gestion-user/gestion-user.component";
import {ChoixThemeAdminComponent} from "./choix-theme-admin/choix-theme-admin.component";
import {CreationQuizComponent} from "./creation-quiz/creation-quiz.component";
import {DetailQuestionComponent} from "./detail-question/detail-question.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {CreationUserComponent} from "./creation-user/creation-user.component";
import {DetailQuizComponent} from "./detail-quiz/detail-quiz.component";
import {CreationQuestionComponent} from "./creation-question/creation-question.component";
import {CreationReponseComponent} from "./creation-reponse/creation-reponse.component";
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {EditReponseComponent} from "./edit-reponse/edit-reponse.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {PageAccueilComponent} from "./page-accueil/page-accueil.component";
import {ConnexionAdminComponent} from "./connexion-admin/connexion-admin.component";


const routes: Routes = [
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "connexion", component: ConnexionComponent},
  {path: "connexion_admin", component: ConnexionAdminComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "connexion", component: ConnexionComponent},
  {path: "connexion_admin", component: ConnexionAdminComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "choix_theme", component: ChoixThemeComponent},
  {path: "lien/:genre", component: LienComponent},
  {path: "classement", component: ClassementComponent},
  {path: "question/:genre/:id", component: QuestionsComponent},
  {path: "question", component: QuestionsComponent},
  {path: "accueil_admin", component: AccueilAdminComponent},
  {path: "gestion_quiz", component: GestionQuizComponent},
  {path: "gestion_user", component: GestionUserComponent},
  {path: "choix_theme_admin", component: ChoixThemeAdminComponent},
  {path: "creation_quiz", component: CreationQuizComponent},
  {path: "creation_user", component: CreationUserComponent},
  {path: "creation_question/:genre/:id", component: CreationQuestionComponent},
  {path: "creation_reponse/:id", component: CreationReponseComponent},
  {path: "detail_question/:id", component: DetailQuestionComponent},
  {path: "edit_question/:id", component: EditQuestionComponent},
  {path: "edit_reponse/:id", component: EditReponseComponent},
  {path: "edit_user/:id", component: EditUserComponent},
  {path: "", component: PageAccueilComponent},
  {path: "detail_quiz/:genre/:id", component: DetailQuizComponent},
  {path: "edit_user/:id", component: EditUserComponent},
  {path: "detail_quiz/:genre", component: DetailQuizComponent},
  {path: "", component: PageAccueilComponent},


  {path: "", component: PageAccueilComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
