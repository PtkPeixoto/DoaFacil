import { ICompany, IDonation, IRescue } from "../../../Types/types";

export interface Payload {
  companies: Array<ICompany>
  setCompanies: React.Dispatch<React.SetStateAction<Array<ICompany>>>;
  rescues: Array<IRescue>;
  setRescues: React.Dispatch<React.SetStateAction<Array<IRescue>>>;
  donations: Array<IDonation>;
  setDonations: React.Dispatch<React.SetStateAction<Array<IDonation>>>;
}

// Define o tipo do estado compartilhado
export interface ContextData {  
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;  
}
