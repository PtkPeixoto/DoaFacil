import React, { createContext, useContext, useState } from "react";
import { ContextData, Payload } from "./types";

export const initialPayload: Payload = {};

const Context = createContext<ContextData | undefined>(undefined);

// Cria o Provider
export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState<Payload>(initialPayload);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  React.useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
        payload,
        setPayload,
        dialogVisible,
        setDialogVisible,
        dialogTitle,
        setDialogTitle,
        dialogMessage,
        setDialogMessage,
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
