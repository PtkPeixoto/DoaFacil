import { ICadastroTypes } from "../View/Cadastro/provider/types";
import { IUser } from "../View/Provider/types";
import api from "./api";
import { Donation } from "./types";

export const createUser = async (user: IUser) => {
    const response = await api.post("/createUser", user);
    return response;
}

export const getUsersByType = async (userType: ICadastroTypes) => {
    const response = await api.get(`/getUsers/${userType}`);
    return response;
}

export const getUsersById = async (id: string) => {
    const response = await api.get(`/getUser/${id}`);
    return response;
}

export const validateUser = async (email: string, password: string) => {
    const response = await api.get("/validateUser?email=" + email + "&password=" + password);
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
    const response = await api.post("/createDonation", donation);
    return response;    
}

export const getRescues = async (filters: {donation_id?: string, user_id?: string}) => {
    const response = await api.get("/rescuesFiltered", { params: filters });
    return response;
}

export const requestRescue = async (donation_id: string, user_id: string) => {
    const response = await api.post("/createRescue", { donation_id, user_id });
    return response;
}

export const effectuateRescue = async (rescue_id: string) => {
    const body = {
        recue_date: new Date().toISOString(),
    }
    const response = await api.put(`/updateRescue/${rescue_id}`, body);
    return response;
}