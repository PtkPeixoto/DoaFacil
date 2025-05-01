import Content from "./content";
import { ContextProvider } from "./provider";

export const Clean = () => {
  return (
    <ContextProvider>
      <Content/>
    </ContextProvider>
  );
}