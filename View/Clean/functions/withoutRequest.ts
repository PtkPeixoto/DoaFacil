import { useDataContext } from "../provider";
import WithRequest from "./withRequest";

const WithoutRequest = () => {
  const {
    payload,
    setPayload,
    setDialogVisible,
    setDialogTitle,
    setDialogMessage,
  } = useDataContext();

  // const {} = WithRequest();
};

export default WithoutRequest;
