import React, { useEffect } from "react";
import { useGlobalContext } from "../View/Provider/GlobalProvider";
import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Types/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Login } from "../View/Login";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useGlobalContext();
  const Drawer = createDrawerNavigator<RootStackParamList>();

  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
      React.useCallback(() => {
        if (!user || user === null) {
            navigation.navigate("Login");
          }
      }, [])
    );

  if (!user || user === null) {
    <NavigationContainer>
        <Drawer.Screen name="Login" component={Login} />
      </NavigationContainer>
  }

  return <>{children}</>;
};

export default ProtectedRoute;
