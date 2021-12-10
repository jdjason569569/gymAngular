import { DocumentReference } from "firebase/firestore";

export class Inscripcion{
  fecha!: Date;
  fechaFinal!: Date;
  cliente!: DocumentReference;
  precios!: DocumentReference;
  subTotal!: number;
  isv!: number;
  total!: number;

  constructor(){}
}