import Content from "./content";
import { ContextProvider } from "./provider";

export const Login = () => {
  return (
    <ContextProvider>
      <Content/>
    </ContextProvider>
  );
}