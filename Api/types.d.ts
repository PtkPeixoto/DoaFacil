export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    CNPJ?: string;
    fantasyName?: string;
    companyName?: string;
}

export interface Donation {
    id?: string;
    description: string;
    quantity?: number;
    status: string;
}