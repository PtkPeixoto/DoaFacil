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
    return response;
}

export const getDonations = async () => {
    const donations = await api.get("/donations");
    return donations;
}

export const getDonationById = async (id: string) => {
    const donation = await api.get(`/donations/${id}`);
    return donation;
}

export const createDonation = async (donation: Donation) => {
    const response = await api.post("/donations", donation);
    return response;    
}

export const getRescues = async () => {
    const response = await api.get("/rescues");
    return response;
}