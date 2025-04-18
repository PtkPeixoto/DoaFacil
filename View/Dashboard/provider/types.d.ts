export interface Payload {}

// Define o tipo do estado compartilhado
export interface ContextData {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string;
  setDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  dialogMessage: string;
  setDialogMessage: React.Dispatch<React.SetStateAction<string>>;
}
