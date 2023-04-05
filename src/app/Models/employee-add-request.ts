export class EmployeeAddRequest {

    employeeName: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    countryID: string;
    address: string;
    countryName: string
    receiveNewsLetters: boolean
}

export enum Gender {
    "Male",
    "Female",
    "Other"
}