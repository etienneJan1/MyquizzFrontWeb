import {Questions} from "./Questions";


export interface Reponse {
  id?: bigint
  contenu?: string
  isgood?:boolean
  question?: Questions
}
