import { createUser } from "../../../Api/functions";
import { User } from "../../../Api/types";
import { useCadastroContext } from "../provider";
import WithRequest from "./withRequest";

const WithoutRequest = () => {
  const {
    payload,
    setPayload,
    setLoadingFieldsCep,
    setLoadingFieldsCNPJ,
    setDialogMessage,
    setDialogVisible,
    selectedType,
  } = useCadastroContext();
  const { consultaCep, consultaCNPJ } = WithRequest();

  const handleCep = async () => {
    if (payload.zipCode.length < 8) return;
    setPayload({
      ...payload,
      address: "",
      neighborhood: "",
      city: "",
      state: "",
    });

    setLoadingFieldsCep(true);

    const response = await consultaCep(payload.zipCode);
    if (response) {
      setPayload({
        ...payload,
        address: response.street,
        neighborhood: response.neighborhood,
        city: response.city,
        state: response.state,
      });
    } else {
      setDialogMessage("CEP não encontrado");
      setDialogVisible(true);
    }

    setLoadingFieldsCep(false);
  };

  const handleCNPJ = async () => {
    if (!payload.CNPJ) return;

    if (payload.CNPJ.length < 8) return;
    setPayload({
      ...payload,
      fantasyName: "",
      companyName: "",
    });

    setLoadingFieldsCNPJ(true);

    const response = await consultaCNPJ(payload.CNPJ);
    if (response) {
      setPayload({
        ...payload,
        fantasyName: response.nome_fantasia,
        companyName: response.razao_social,
      });
    } else {
      setDialogMessage("CNPJ não encontrado");
      setDialogVisible(true);
    }

    setLoadingFieldsCNPJ(false);
  };

  const handleCreate = async () => {
    if (
      payload.password === "" ||
      payload.password !== payload.confirm_password
    ) {
      setDialogMessage("As senhas não coincidem");
      setDialogVisible(true);
      return;
    }

    const newFields = { ...payload };
    if (selectedType === "retirada") {
      delete newFields.CNPJ;
      delete newFields.fantasyName;
      delete newFields.companyName;
    }

    const allFieldsFilled = Object.values(newFields).every(
      (value) => value.trim() !== ""
    );

    if (!allFieldsFilled) {
      setDialogMessage("Por favor, preencha todos os campos.");
      setDialogVisible(true);
      return;
    }

    const response = await createUser(payload as unknown as User);
    if (!response) {
      setDialogMessage("Erro ao criar usuário");
      setDialogVisible(true);
      return;
    }

    if (response.status !== 201) {
      console.log({ response });
      setDialogMessage("Erro ao criar usuário");
      setDialogVisible(true);
      return;
    }

    setDialogMessage("Usuário criado com sucesso!");
    setDialogVisible(true);
  };

  return { handleCep, handleCNPJ, handleCreate };
};

export default WithoutRequest;
