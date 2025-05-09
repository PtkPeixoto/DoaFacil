import React, { createContext, useContext, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  // Salva o usuário no AsyncStorage
  const saveUserToCache = async (user: IUser | null) => {
    try {
      if (user) {
        console.log("Salvando usuário no cache...", user);
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }
      //  else {
      //   await AsyncStorage.removeItem("user");
      // }
    } catch (error) {
      console.error("Erro ao salvar usuário no cache:", error);
    }
  };

  // Recupera o usuário do AsyncStorage
  const loadUserFromCache = async () => {
    try {      
    console.log("Carregando usuário do cache...");
      const cachedUser = await AsyncStorage.getItem("user");
      console.log("Usuário carregado do cache:", cachedUser);
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do cache:", error);
    } finally {
      setIsLoading(false); // Finaliza o carregamento inicial
    }
  };

  // Atualiza o cache sempre que o usuário mudar
  useEffect(() => {
    saveUserToCache(user);
  }, [user]);

  // Carrega o usuário do cache na inicialização
  useEffect(() => {
    loadUserFromCache();
  }, []);

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
