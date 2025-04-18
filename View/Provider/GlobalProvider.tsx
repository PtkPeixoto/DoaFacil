import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import {
  Provider as PaperProvider,
  Dialog,
  Portal,
  Button,
  ActivityIndicator,
  Text,
} from "react-native-paper";
import defaultStyles from "../../assets/styles";
import { GlobalContextProps, IUser } from "./types";



const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        dialogTitle,
        setDialogTitle,
        dialogMessage,
        setDialogMessage,
        dialogVisible,
        setDialogVisible,
        user,
        setUser,
      }}
    >
      {children}

      {isLoading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      )}

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext só pode ser usado dentro de GlobalProvider"
    );
  }
  return context;
};
