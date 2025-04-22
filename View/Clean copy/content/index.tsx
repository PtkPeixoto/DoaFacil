import React from "react";
import { View, Text } from "react-native";

import defaultStyles from "../../../assets/styles";
import {
  Provider as PaperProvider,
  Dialog,
  Portal,
  Button,
  ActivityIndicator,
} from "react-native-paper";

import { useDataContext } from "../provider/index";
import WithRequest from "../functions/withRequest";
import WithoutRequest from "../functions/withoutRequest";
import { useGlobalContext } from "../../Provider/GlobalProvider";

export default function Content() {
  const { payload, setPayload } = useDataContext();

  const {
    isLoading,
    dialogVisible,
    setDialogVisible,
    setDialogTitle,
    setDialogMessage,
    dialogTitle,
    dialogMessage,
  } = useGlobalContext();

  // const {  } = WithRequest();
  // const {  } = WithoutRequest();

  return <View style={defaultStyles.container}>Clean</View>;
}
