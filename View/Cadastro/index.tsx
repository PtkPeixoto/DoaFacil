import Content from "./content";
import { CadastroProvider } from "./provider";

export const Cadastro = () => {
  return (
    <CadastroProvider>
      <Content/>
    </CadastroProvider>
  );
}