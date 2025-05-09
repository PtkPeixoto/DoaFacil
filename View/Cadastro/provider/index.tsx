import React, { createContext, useContext, useState } from "react";
import { IField } from "../../../Types/fields";
import { CadastroContextData, Payload } from "./types";

export const initialPayload: Payload = {
  user_type: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: "",
  address: "",
  neighborhood: "",
  city: "",
  state: "",
  zipCode: "",
  CNPJ: "",
  fantasyName: "",
  companyName: "",
};

// Cria o contexto
const CadastroContext = createContext<CadastroContextData | undefined>(
  undefined
);

// Cria o Provider
export const CadastroProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [payload, setPayload] = useState<Payload>(initialPayload);

  const [types, setTypes] = React.useState([
    { id: 1, label: "Usuário", value: "user" },
    { id: 2, label: "Empresa", value: "company" },
  ]);

  const [typeIsOpen, setTypeIsOpen] = React.useState(false);
  const [loadingFieldsCep, setLoadingFieldsCep] = React.useState(false);
  const [loadingFieldsCNPJ, setLoadingFieldsCNPJ] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<
    (typeof types)[number]["value"] | null
  >(null);

  const [fields, setFields] = React.useState<IField[]>([    
    {
      key: "email",
      label: "Email",
      placeholder: `${
        selectedType === "company" ? "Email para contato" : "Email"
      }`,
      keyboardType: "email-address",
    },

    {
      key: "password",
      label: "Senha",
      placeholder: `Senha`,
      keyboardType: "default",
      secureTextEntry: true,
    },
    {
      key: "password_confirmation",
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

  const [fieldsUser, setFieldsUser] = React.useState<IField[]>([
    {
      key: "name",
      label: "Nome",
      placeholder: `${
        selectedType === "company" ? "Nome do contato" : "Nome"
      }`,
      keyboardType: "default",
    },
    {
      key: "phone",
      label: "Telefone",
      placeholder: `${
        selectedType === "company"
          ? "Telefone para contato"
          : "Telefone"
      }`,
      keyboardType: "phone-pad",
    },
  ]);

  const [fieldsCompany, setFieldsCompany] = React.useState<IField[]>([
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
    {
      key: "name",
      label: "Nome",
      placeholder: `${
        selectedType === "company" ? "Nome do contato" : "Nome"
      }`,
      keyboardType: "default",
    },
    {
      key: "phone",
      label: "Telefone",
      placeholder: `${
        selectedType === "company"
          ? "Telefone para contato"
          : "Telefone"
      }`,
      keyboardType: "phone-pad",
    },
  ]);

  React.useEffect(() => {
    let fieldsToclean = {};

    if (selectedType === "user") {
      fieldsToclean = { CNPJ: "", fantasyName: "", companyName: "" };
    }

    setPayload({ ...payload, user_type: selectedType || "", ...fieldsToclean });
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
        loadingFieldsCep,
        setLoadingFieldsCep,
        loadingFieldsCNPJ,
        setLoadingFieldsCNPJ,
        selectedType,
        setSelectedType,
        fields,
        setFields,
        fieldsUser,
        setFieldsUser,
        fieldsCompany,
        setFieldsCompany,
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
