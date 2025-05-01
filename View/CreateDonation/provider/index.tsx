import React, { createContext, useContext, useState } from "react";
import { ContextData, Payload } from "./types";
import { IField } from "../../../Types/fields";

export const initialPayload: Payload = {
  user_id: undefined,
  category_id: undefined,
  name: "",
  description: "",
  quantity: 1,
  status: "active",
};

const Context = createContext<ContextData | undefined>(undefined);

// Cria o Provider
export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [payload, setPayload] = useState<Payload>(initialPayload);
  const [fields, setFields] = useState<IField[]>([
    {
      key: "name",
      label: "Nome",
      placeholder: "Digite um nome",
    },
    {
      key: "description",
      label: "Descrição",
      placeholder: "Digite uma descrição",
    },
    {
      key: "quantity",
      label: "Quantidade",
      placeholder: "Digite a quantidade",
      keyboardType: "numeric",
    },
  ]);

  React.useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{
        payload,
        setPayload,
        fields, 
        setFields,
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
