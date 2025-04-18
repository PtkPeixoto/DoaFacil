import { ICadastroTypes } from "../View/Cadastro/provider/types";
import api from "./api";
import { Donation, User } from "./types";

export const createUser = async (user: User) => {
    const response = await api.post("/createUser", user);
    return response;
}

export const getUsersByType = async (userType: ICadastroTypes) => {
    const response = await api.get(`/getUsers/${userType}`);
    return response;
}

export const validateUser = async (email: string, password: string) => {
    const response = await api.post("/validateUser", { email, password });
    
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("Failed to validate user");
    }
}

export const getDonations = async () => {
    const donations = await api.get("/donations");
    
    if (donations.status === 200) {
        return donations.data;
    } else {
        throw new Error("Failed to fetch donations");
    }
}

export const getDonationById = async (id: string) => {
    const donation = await api.get(`/donations/${id}`);
    
    if (donation.status === 200) {
        return donation.data;
    } else {
        throw new Error("Failed to fetch donation by ID");
    }
}

export const createDonation = async (donation: Donation) => {
    const response = await api.post("/donations", donation);
    
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error("Failed to create donation");
    }
}