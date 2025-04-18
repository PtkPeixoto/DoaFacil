export interface Payload {
  email: string;
  password: string;
}

export interface ContextData {
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;  
}
