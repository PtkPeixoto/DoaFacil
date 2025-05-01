import { useNavigation } from "@react-navigation/native";
import {
  getDonations,
  getUsersByType,
  getRescues as apiGetRescues,
  getUsersById,
  getDonationById,
  requestRescue as apiRequestRescue,
} from "../../../Api/functions";
import { useDataContext } from "../provider";
import { RootStackParamList } from "../../../Types/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useGlobalContext } from "../../Provider/GlobalProvider";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const WithRequest = () => {
  const navigation = useNavigation<NavigationProp>();

  const {
    payload,
    setPayload,
    setCompanies,
    setDonations,
    setRescues,
  } = useDataContext();

  const { user, setDialogTitle, setDialogMessage, setDialogVisible, setIsLoading } =
    useGlobalContext();

  const getCompanies = async () => {
    setIsLoading(true);

    try {
      const response = await getUsersByType("company");
      if (String(response.status).startsWith("2")) {
        if (response.status === 200) {
          const companies = response.data;
          setCompanies(companies);
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
  };

  const getDonates = async () => {
    setIsLoading(true);

    try {
      const response = await getDonations();
      if (String(response.status).startsWith("2")) {
        if (response.status === 200) {
          const donations = response.data;
          setDonations(donations);
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
  };

  const getDonate = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await getDonationById(id);
      if (String(response.status).startsWith("2")) {
        if (response.status === 200) {
          return response.data;
        }
        setIsLoading(false);
      } else {
        console.log(response);
        setDialogTitle("Erro");
        setDialogMessage("Não foi encontrar a doação.");
        setDialogVisible(true);
        setIsLoading(false);
        return null;
      }
    } catch (error) {
      console.log("Erro ao buscar a doação:", error);
      setIsLoading(false);
      return null;
    }
  };

  const getRescues = async () => {
    setIsLoading(true);

    try {
      if(!user) return;
      const response = await apiGetRescues({user_id: user.id});
      if (String(response.status).startsWith("2")) {
        if (response.status === 200) {
          const rescues = response.data;
          setRescues(rescues);
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
  };

  const getUser = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await getUsersById(id);
      if (String(response.status).startsWith("2")) {
        setIsLoading(false);
        if (response.status === 200) {
          const user = response.data;
          return user;
        }
        
      } else {
        setDialogTitle("Erro");
        setDialogMessage("Não foi possível obter o usuário.");
        setDialogVisible(true);
        setIsLoading(false);

        return null;
      }

    } catch (error) {
      console.log("Erro ao obter usuário:", error);
      setIsLoading(false);    
      return null; 
    }
  }

  const requestRescue = async (donation_id: string, user_id: string) => {
    setIsLoading(true);
      
      try {
        const response = await getDonationById(donation_id);

        if (String(response.status).startsWith("2")) {
          if (response.status === 200) {
            const donation = response.data;
            if (donation.status !== "active") {
              setDialogTitle("Erro");
              setDialogMessage("Essa doação não está mais disponível.");
              setDialogVisible(true);
              setIsLoading(false);
              return;
            }
            
            const rescueResponse = await apiRequestRescue(donation_id, user_id);
              if (rescueResponse.status === 201) {
                setDialogTitle("Sucesso");
                setDialogMessage("Resgate solicitado com sucesso.");
                setDialogVisible(true);
                setIsLoading(false);
                return;
              } else {
                setDialogTitle("Erro");
                setDialogMessage("Não foi possível confirmar a solicitação do resgate.");
                setDialogVisible(true);
                setIsLoading(false);
              }
          }
          setIsLoading(false);
        } else {
          setDialogTitle("Erro");
          setDialogMessage("Não foi possível solicitar o resgate.");
          setDialogVisible(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Erro ao solicitar resgate:", error);
        setIsLoading(false);
      }
    }

  return { getCompanies, getDonate, getDonates, getRescues, getUser, requestRescue };
};

export default WithRequest;
