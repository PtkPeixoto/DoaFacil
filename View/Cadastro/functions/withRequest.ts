import { brasilApi } from "../../../Api/api";

const WithRequest = () => {
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

  return { consultaCep, consultaCNPJ };
};

export default WithRequest;
