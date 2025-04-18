import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Dashboard } from "../View/Dashboard";
import { Cadastro } from "../View/Cadastro";
import { RootStackParamList } from "../Types/routes";
import { Icon } from "react-native-paper";

const Drawer = createDrawerNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          drawerItemStyle: {
            marginVertical: 2, // Espaçamento vertical entre os itens
          },
          drawerStyle: {
            backgroundColor: "#f5f5f5", // Cor de fundo do menu
          },
          drawerLabelStyle: {
            fontSize: 16, // Tamanho da fonte
          },
          drawerActiveTintColor: "#007BFF", // Cor do item ativo
          drawerInactiveTintColor: "#333", // Cor do item inativo
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="view-dashboard" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="account-plus" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
