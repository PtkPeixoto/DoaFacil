export interface Payload {}

export interface ContextData {
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;  
}
