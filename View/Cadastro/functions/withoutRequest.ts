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

  return { handleCep, handleCNPJ };
};

export default WithoutRequest;
