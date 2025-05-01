import React, { createContext, useContext, useState } from "react";
import { ContextData, Payload } from "./types";
import { ICompany, IDonation, IRescue } from "../../../Types/types";

export const initialPayload: Payload = {};

const Context = createContext<ContextData | undefined>(undefined);

// Cria o Provider
export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [payload, setPayload] = useState<Payload>(initialPayload);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [rescues, setRescues] = useState<IRescue[]>([]);
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [modalActions, setModalActions] = useState<
    | {
        title: string;
        action: () => void;
      }[]
    | null
  >(null);

  React.useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{
        payload,
        setPayload,
        companies,
        setCompanies,
        rescues,
        setRescues,
        donations,
        setDonations,
        showModal,
        setShowModal,
        modalDetails,
        setModalDetails,
        modalActions,
        setModalActions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Hook para usar o contexto
export const useDataContext = (): ContextData => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useDataContext deve ser usado dentro de um ContextProvider"
    );
  }
  return context;
};
