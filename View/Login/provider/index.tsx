import React, { createContext, useContext, useState } from "react";
import { ContextData, Payload } from "./types";

export const initialPayload: Payload = {
  email: "",
  password: "",
};

const Context = createContext<ContextData | undefined>(undefined);

// Cria o Provider
export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [payload, setPayload] = useState<Payload>(initialPayload);

  React.useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{
        payload,
        setPayload,
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
