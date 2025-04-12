import { brasilApi } from "../../Api/api";

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

export { consultaCep };
