interface GlobalContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string;
  setDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  dialogMessage: string;
  setDialogMessage: React.Dispatch<React.SetStateAction<string>>;
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export interface IUser {
    id: string;
    user_type: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    cnpj?: string;
    fantasyName?: string;
    companyName?: string;
    created_at: string;
    updated_at: string;
}