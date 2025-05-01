import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Dashboard } from "../View/Dashboard";
import { Cadastro } from "../View/Cadastro";
import { RootStackParamList } from "../Types/routes";
import { Icon } from "react-native-paper";
import { Login } from "../View/Login";
import { useGlobalContext } from "../View/Provider/GlobalProvider";
import ProtectedRoute from "./protectedRoute";
import Logout from "../View/Logout";
import { CreateDonation } from "../View/CreateDonation";

const Drawer = createDrawerNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user } = useGlobalContext();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        key={user ? "authenticated" : "unauthenticated"}
        initialRouteName={user ? "Dashboard" : "Login"}
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
        {!user && (
          <>
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Icon source="account-plus" color={color} size={size} />
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
          </>
        )}

        <Drawer.Screen
          name="Dashboard"
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="view-dashboard" color={color} size={size} />
            ),
            drawerItemStyle: { display: user ? "flex" : "none" },
          }}
        >
          {() => (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )}
        </Drawer.Screen>

        <Drawer.Screen
          name="Cadastrar Doação"
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="package" color={color} size={size} />
            ),
            drawerItemStyle: { display: user ? "flex" : "none" },
          }}
        >
          {() => (
            <ProtectedRoute>
              <CreateDonation />
            </ProtectedRoute>
          )}
        </Drawer.Screen>

        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="logout" color={color} size={size} />
            ),
            drawerItemStyle: { display: user ? "flex" : "none" },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
