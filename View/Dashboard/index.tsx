import Content from "./content";
import { ContextProvider } from "./provider";

export const Dashboard = () => {
  return (
    <ContextProvider>
      <Content/>
    </ContextProvider>
  );
}