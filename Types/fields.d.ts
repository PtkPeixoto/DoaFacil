import { KeyboardTypeOptions } from "react-native";

export interface IField {
    key: string;
    label: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
}