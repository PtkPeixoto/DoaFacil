import { PaperProvider } from "react-native-paper";
import AppNavigator from "./routes/routes";
import { GlobalProvider } from "./View/Provider/GlobalProvider";

export default function App() {
  return (
    <PaperProvider>
      <GlobalProvider>
        <AppNavigator />
      </GlobalProvider>
    </PaperProvider>
  );
}
