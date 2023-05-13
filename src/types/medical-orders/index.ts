import type { Medicine } from "../medicines";


export interface MedicalOrder {
    name: string
    LastName: string
    idNumber: string
    eps: string
    medicines : Medicine[]
    comments: string
    doctorSignature: string
    createdAt?: string
}