import { useGlobalContext } from "../../Provider/GlobalProvider";
import { useDataContext } from "../provider";
import WithRequest from "./withRequest";

const WithoutRequest = () => {
  const { payload, setPayload } = useDataContext();

  const { setDialogVisible, setDialogTitle, setDialogMessage } =
    useGlobalContext();

  // const {} = WithRequest();
};

export default WithoutRequest;
