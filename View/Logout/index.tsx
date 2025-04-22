import { useEffect } from "react";
import { useGlobalContext } from "../Provider/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Types/routes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const Logout = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setUser } = useGlobalContext();

  useFocusEffect(() => {
    const handleLogout = async () => {
      await AsyncStorage.removeItem("user");
      setUser(null);

      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    };

    handleLogout();
  });

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Text>Deslogando...</Text>
    </View>
  );
};

export default Logout;
