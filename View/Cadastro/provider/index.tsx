import React, { createContext, useContext, useState } from "react";
import { IField } from "../../../Types/fields";

export interface Payload {
  name: string;
    email: string;
    password: string;
    confirm_password: string;
    phone: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    CNPJ?: string;
    fantasyName?: string;
    companyName?: string;
}
// Define o tipo do estado compartilhado
interface CadastroContextData {
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;
  types: Array<{ id: number; label: string; value: string }>;
  setTypes: React.Dispatch<
    React.SetStateAction<Array<{ id: number; label: string; value: string }>>
  >;
  typeIsOpen: boolean;
  setTypeIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dialogMessage: string;
  setDialogMessage: React.Dispatch<React.SetStateAction<string>>;
  loadingFieldsCep: boolean;
  setLoadingFieldsCep: React.Dispatch<React.SetStateAction<boolean>>;
  loadingFieldsCNPJ: boolean;
  setLoadingFieldsCNPJ: React.Dispatch<React.SetStateAction<boolean>>;
  selectedType: string | null;
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
  fields: IField[];
  setFields: React.Dispatch<React.SetStateAction<IField[]>>;
  fieldsRetirada: IField[];
  setFieldsRetirada: React.Dispatch<React.SetStateAction<IField[]>>;
  fieldsDoacao: IField[];
  setFieldsDoacao: React.Dispatch<React.SetStateAction<IField[]>>;
}

// Cria o contexto
const CadastroContext = createContext<CadastroContextData | undefined>(
  undefined
);

// Cria o Provider
export const CadastroProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [payload, setPayload] = useState<Payload>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    CNPJ: "",
    fantasyName: "",
    companyName: "",
  });

  const [types, setTypes] = React.useState([
    { id: 1, label: "Doação", value: "doacao" },
    { id: 2, label: "Retirada", value: "retirada" },
  ]);

  const [typeIsOpen, setTypeIsOpen] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [loadingFieldsCep, setLoadingFieldsCep] = React.useState(false);
  const [loadingFieldsCNPJ, setLoadingFieldsCNPJ] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<typeof types[number]["value"] | null>(null);

  const [fields, setFields] = React.useState<IField[]>([
    {
      key: "username",
      label: "Usuário",
      placeholder: `Usuário`,
      keyboardType: "default",
    },
    {
      key: "password",
      label: "Senha",
      placeholder: `Senha`,
      keyboardType: "default",
      secureTextEntry: true,
    },
    {
      key: "confirm_password",
      label: "Confirmação de Senha",
      placeholder: `Confirmação de Senha`,
      keyboardType: "default",
      secureTextEntry: true,
    },
    {
      key: "zipCode",
      label: "Cep",
      placeholder: `Cep`,
      keyboardType: "numeric",
    },
    {
      key: "address",
      label: "Endereço",
      placeholder: `Endereço`,
    },
    {
      key: "neighborhood",
      label: "Bairro",
      placeholder: `Bairro`,
    },
    {
      key: "city",
      label: "Cidade",
      placeholder: `Cidade`,
    },
    {
      key: "state",
      label: "Estado",
      placeholder: `Estado`,
    },
  ]);
  // Campos adicionais para retirada
  const [fieldsRetirada, setFieldsRetirada] = React.useState<IField[]>([
    {
      key: "name",
      label: "Nome",
      placeholder: `${
        selectedType === "doacao" ? "Nome do doador" : "Nome do retirante"
      }`,
      keyboardType: "default",
    },
    {
      key: "email",
      label: "Email",
      placeholder: `${
        selectedType === "doacao" ? "Email do doador" : "Email do retirante"
      }`,
      keyboardType: "email-address",
    },
    {
      key: "phone",
      label: "Telefone",
      placeholder: `${
        selectedType === "doacao"
          ? "Telefone do doador"
          : "Telefone do retirante"
      }`,
      keyboardType: "phone-pad",
    },
  ]);
  // Campos adicionais para doação
  const [fieldsDoacao, setFieldsDoacao] = React.useState<IField[]>([
    {
      key: "CNPJ",
      label: "CNPJ",
      placeholder: "CNPJ",
      keyboardType: "default",
    },
    {
      key: "fantasyName",
      label: "Nome Fantasia",
      placeholder: "Nome Fantasia",
      keyboardType: "default",
    },
    {
      key: "companyName",
      label: "Razão Social",
      placeholder: "Razão Social",
      keyboardType: "default",
    },
  ]);

  React.useEffect(()=>{
    if(selectedType === "retirada"){
      setPayload({...payload, CNPJ: "", fantasyName: "", companyName: ""});
    }
  }, [selectedType]);

  return (
    <CadastroContext.Provider
      value={{
        payload,
        setPayload,
        types,
        setTypes,
        typeIsOpen,
        setTypeIsOpen,
        dialogVisible,
        setDialogVisible,
        dialogMessage,
        setDialogMessage,
        loadingFieldsCep,
        setLoadingFieldsCep,
        loadingFieldsCNPJ,
        setLoadingFieldsCNPJ,
        selectedType,
        setSelectedType,
        fields,
        setFields,
        fieldsRetirada,
        setFieldsRetirada,
        fieldsDoacao,
        setFieldsDoacao,
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
};

// Hook para usar o contexto
export const useCadastroContext = (): CadastroContextData => {
  const context = useContext(CadastroContext);
  if (!context) {
    throw new Error("useCadastro deve ser usado dentro de um CadastroProvider");
  }
  return context;
};
