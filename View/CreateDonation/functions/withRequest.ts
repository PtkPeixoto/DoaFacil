import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { initialPayload, useDataContext } from "../provider";
import { RootStackParamList } from "../../../Types/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useGlobalContext } from "../../Provider/GlobalProvider";
import { createDonation } from "../../../Api/functions";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const WithRequest = () => {
  const navigation = useNavigation<NavigationProp>();

  const { payload, setPayload } = useDataContext();

  const { setDialogTitle, setDialogMessage, setDialogVisible, setIsLoading, user } =
    useGlobalContext();

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      const response = await createDonation(payload);
      console.log({payload, response});

      if (!response) {
        setDialogMessage("Erro ao criar doação");
        setDialogVisible(true);
        return;
      }

      if (response.status === 422) {
        const errorMessage = response.data.message || "Erro ao criar doação";
        const errors = response.data.errors || {};

        const errorMessages = Object.values(errors).flat().join("\r\n");
        setDialogTitle(errorMessage);
        setDialogMessage(errorMessages);
        setDialogVisible(true);
        return;
      }

      if (response.status !== 201) {
        setDialogTitle("Erro ao criar doação");
        setDialogMessage(response.data.message || "Erro ao criar doação");
        setDialogVisible(true);
        return;
      }

      if (response.status === 201) {
        setDialogTitle("Sucesso");
        setDialogMessage("Doação criada com sucesso!");
        setDialogVisible(true);
        setPayload(initialPayload);
        navigation.navigate("Dashboard");
      }

    }catch(error){
      console.log(error);
      setIsLoading(false);
    }
  }

  return {handleCreate};
};

export default WithRequest;
