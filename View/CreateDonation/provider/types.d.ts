import { IField } from "../../../Types/fields";

export interface Payload {
  user_id?: string;
  category_id?: string;
  name: string;
  description: string;
  quantity?: number;
  status: string;
}

export interface ContextData {
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;
  fields: IField[];
  setFields: React.Dispatch<React.SetStateAction<IField[]>>;
}
