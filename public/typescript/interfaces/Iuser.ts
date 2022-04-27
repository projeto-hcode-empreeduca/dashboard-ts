import { Timestamp } from "firebase/firestore";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    photo?: string; // Defino que a propriedade é opcional. Pode ou não ter valor
    job: string;
    department: string;
    status: boolean;
    // register: Date;
    register: Timestamp;
}