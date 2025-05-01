import Content from "./content";
import { ContextProvider } from "./provider";

export const CreateDonation = () => {
  return (
    <ContextProvider>
      <Content/>
    </ContextProvider>
  );
}