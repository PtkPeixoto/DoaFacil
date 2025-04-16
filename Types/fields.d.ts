import { KeyboardTypeOptions } from "react-native";

export interface IField {
    key: string;
    label: string;
    secureTextEntry?: boolean;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
}