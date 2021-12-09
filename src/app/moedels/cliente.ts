import { DocumentReference } from "firebase/firestore";

export class Cliente{
    id!: string;
    nombre!: string;
    apellido!: string;
    correo!: string;
    fechaNacimiento!: string;
    imgUrl!: Date;
    telefono!: number;
    cedula!: string;
    ref!: DocumentReference;
    isVisible!: boolean;

}