export interface ICompany {
    id: string;
    name: string;
    cnpj: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface IRescue {
    id: string;
    company_id: number;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface IDonation {
    id: string;
    company_id: number;
    quantity: number;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}