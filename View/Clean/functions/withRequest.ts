import { useNavigation } from "@react-navigation/native";
import { brasilApi } from "../../../Api/api";
import { createUser } from "../../../Api/functions";
import { User } from "../../../Api/types";
import { initialPayload, useDataContext } from "../provider";
import { RootStackParamList } from "../../../Types/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const WithRequest = () => {
  const navigation = useNavigation<NavigationProp>();

  const {
    payload,
    setDialogTitle,
    setDialogMessage,
    setDialogVisible,
    setPayload,
    setIsLoading,
  } = useDataContext();

  
};

export default WithRequest;
