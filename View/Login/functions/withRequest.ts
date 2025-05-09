import { useNavigation } from "@react-navigation/native";
import { brasilApi } from "../../../Api/api";
import { createUser, validateUser } from "../../../Api/functions";
import { initialPayload, useDataContext } from "../provider";
import { RootStackParamList } from "../../../Types/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useGlobalContext } from "../../Provider/GlobalProvider";
import { ICadastroTypes } from "../../Cadastro/provider/types";
import { IUser } from "../../Provider/types";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const WithRequest = () => {
  const navigation = useNavigation<NavigationProp>();

  const { payload, setPayload } = useDataContext();

  const {
    setDialogTitle,
    setDialogMessage,
    setDialogVisible,
    setIsLoading,
    setUser,
  } = useGlobalContext();

  const handleLogin = async () => {
    setIsLoading(true);
    setDialogVisible(false);

    try {
      const response = await validateUser(payload.email, payload.password);

      if (String(response.status).startsWith("2")) {
        if (response.status === 200) {
          setUser(response.data as IUser);
          navigation.navigate("Dashboard");
        } else {
          setDialogTitle("Erro");
          setDialogMessage(response.data.message || response.statusText);
        }
      } else if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      ) {
        setDialogTitle("Erro");
        setDialogMessage("Email ou senha inválidos.");
      } else {
        setDialogTitle("Erro");
        setDialogMessage("Erro ao realizar login.");
      }

      if (response.status !== 200) {
        setDialogVisible(true);
      }
    } catch (error) {
      setDialogTitle("Erro");
      setDialogMessage("Erro ao realizar login.");

      setDialogVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin };
};

export default WithRequest;
