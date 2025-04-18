import { useNavigation } from "@react-navigation/native";
import { getDonations, getUsersByType, getRescues as apiGetRescues } from "../../../Api/functions";
import {  useDataContext } from "../provider";
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

  const getCompanies = async () => {
    setIsLoading(true);

    try {
      const response = await getUsersByType("company");
      if (String(response.status).slice(0, 1) === "2") {
        if(response.status === 200){  
          const companies = response.data;
          setPayload({ ...payload, companies });
        }        
        setIsLoading(false);
      } else {
        setDialogTitle("Erro");
        setDialogMessage("Não foi possível obter as empresas.");
        setDialogVisible(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Erro ao obter empresas:", error);
      setIsLoading(false);
    }
  }

  const getDonates = async () => {
    setIsLoading(true);

    try {
      const response = await getDonations();
      if (String(response.status).slice(0, 1) === "2") {
        if(response.status === 200){  
          const donations = response.data;
          setPayload({ ...payload, donations });
        }
        setIsLoading(false);
      } else {
        console.log(response);
        setDialogTitle("Erro");
        setDialogMessage("Não foi possível listar as doações.");
        setDialogVisible(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Erro ao listar doações:", error);
      setIsLoading(false);
    }
  }

  const getRescues = async () => {
    setIsLoading(true);

    try {
      const response = await apiGetRescues();
      if (String(response.status).slice(0, 1) === "2") {
        if(response.status === 200){  
          const rescues = response.data;
          setPayload({ ...payload, rescues });
        }        
        setIsLoading(false);
      } else {
        setDialogTitle("Erro");
        setDialogMessage("Não foi possível obter os resgates.");
        setDialogVisible(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Erro ao obter resgates:", error);
      setIsLoading(false);
    }
  }

  return {getCompanies, getDonates, getRescues};
};

export default WithRequest;
