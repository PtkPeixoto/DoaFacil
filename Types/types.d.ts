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
    donation_id: string;
    user_id: string;
    user_name: string;
    donation_name: string;
    donor_id: string;
    donor_name: string;
    rescued_quantity: number;
    rescue_date: string;
    created_at: string;
    updated_at: string;
}

export interface IDonation {
    id: string;
    user_id: string;
    name: string;
    description: string;
    quantity: number;
    status: string;
    created_at: string;
    updated_at: string;
}