import { ICompany, IDonation, IRescue } from "../../../Types/types";

export interface Payload {
}

// Define o tipo do estado compartilhado
export interface ContextData {  
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;  
  companies: Array<ICompany>
  setCompanies: React.Dispatch<React.SetStateAction<Array<ICompany>>>;
  rescues: Array<IRescue>;
  setRescues: React.Dispatch<React.SetStateAction<Array<IRescue>>>;
  donations: Array<IDonation>;
  setDonations: React.Dispatch<React.SetStateAction<Array<IDonation>>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalDetails: { title: string; message: string } | null;
  setModalDetails: React.Dispatch<React.SetStateAction<{ title: string; message: string } | null>>;
  modalActions: { title: string; action: () => void }[] | null;
  setModalActions: React.Dispatch<React.SetStateAction<{ title: string; action: () => void }[] | null>>;
}
