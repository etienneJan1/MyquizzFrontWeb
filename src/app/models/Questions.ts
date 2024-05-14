import {Quizz} from "./Quizz";

export interface Questions {
  id?: bigint
  contenu?: string
  genre?: string
  quizz?: Quizz
}
