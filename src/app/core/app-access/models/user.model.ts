import { EsnSectionModel } from "./esnsection.model";
import { NationalityModel } from "./nationality.model";
import { UniversityModel } from "./university.model";

export interface UserModel {
    email: string;
    phone: string;
    name: string;
    surname: string;
    birthDate: Date;
    nationality: NationalityModel;
    university: UniversityModel;
    esnSection: EsnSectionModel;
    esnCard: string;
    expiryDate: Date;
}