import { KeyboardTypeOptions } from "react-native";

interface IbaseField {
  key: string;
  label: string;
  secureTextEntry?: boolean;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
}

export type IField =
  | (IBaseField & {
      mask?: false;
    })
  | (IBaseField & {
      mask: true;
      maskType: string;
      maskOptions: {
        maskType?: string;
        withDDD?: boolean;
        dddMask?: string;
      };
    });
