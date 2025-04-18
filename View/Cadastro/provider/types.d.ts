export interface Payload {
  user_type: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
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
export interface CadastroContextData {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  dialogTitle: string;
  setDialogTitle: React.Dispatch<React.SetStateAction<string>>;
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
  fieldsUser: IField[];
  setFieldsUser: React.Dispatch<React.SetStateAction<IField[]>>;
  fieldsCompany: IField[];
  setFieldsCompany: React.Dispatch<React.SetStateAction<IField[]>>;
}

export type ICadastroTypes = "user" | "company";