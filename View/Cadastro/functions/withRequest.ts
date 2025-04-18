import { useNavigation } from "@react-navigation/native";
import { brasilApi } from "../../../Api/api";
import { createUser } from "../../../Api/functions";
import { User } from "../../../Api/types";
import { initialPayload, useCadastroContext } from "../provider";
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
  } = useCadastroContext();

  const consultaCep = async (cep: string) => {
    try {
      const validCep = cep.replace(/\D/g, "");
      if (validCep.length !== 8) {
        throw new Error("CEP inválido");
      }
      const response = await brasilApi.get("/cep/v1/" + validCep);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const consultaCNPJ = async (cnpj: string) => {
    try {
      const validCNPJ = cnpj.replace(/\D/g, "").trim();

      if (validCNPJ.length !== 14) {
        throw new Error("CNPJ inválido");
      }
      const response = await brasilApi.get("/cnpj/v1/" + validCNPJ);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    if (
      payload.password === "" ||
      payload.password !== payload.password_confirmation
    ) {
      setIsLoading(false);
      setDialogTitle("Erro ao criar usuário");
      setDialogMessage("As senhas não coincidem");
      setDialogVisible(true);
      return;
    }

    const newFields = { ...payload };
    if (payload.user_type === "user") {
      delete newFields.CNPJ;
      delete newFields.fantasyName;
      delete newFields.companyName;
    }

    const allFieldsFilled = Object.values(newFields).every(
      (value) => value.trim() !== ""
    );

    if (!allFieldsFilled) {
      setIsLoading(false);
      setDialogTitle("Erro ao criar usuário");
      setDialogMessage("Por favor, preencha todos os campos.");
      setDialogVisible(true);
      return;
    }

    try {
      const response = await createUser(payload as unknown as User);
      setIsLoading(false);

      if (!response) {
        setDialogMessage("Erro ao criar usuário");
        setDialogVisible(true);
        return;
      }

      if (response.status === 422) {
        const errorMessage = response.data.message || "Erro ao criar usuário";
        const errors = response.data.errors || {};

        const errorMessages = Object.values(errors).flat().join("\r\n");
        setDialogTitle(errorMessage);
        setDialogMessage(errorMessages);
        setDialogVisible(true);
        return;
      }

      if (response.status !== 201) {
        setDialogTitle("Erro ao criar usuário");
        setDialogMessage(response.data.message || "Erro ao criar usuário");
        setDialogVisible(true);
        return;
      }

      setDialogMessage("Usuário criado com sucesso!");
      setDialogVisible(true);
      setPayload(initialPayload);

      setTimeout(() => {
        setDialogVisible(false);
        navigation.navigate("Dashboard");
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return { consultaCep, consultaCNPJ, handleCreate };
};

export default WithRequest;
