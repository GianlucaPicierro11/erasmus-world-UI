import { EsnSectionModel } from "./esnsection.model";
import { NationalityModel } from "./nationality.model";
import { UniversityModel } from "./university.model";

export interface UserModel {
    id: number;
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
    photoProfileUrl: string;
    photoProfileId: string;
}