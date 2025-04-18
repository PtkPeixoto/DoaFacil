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

export default function Content() {
  const {
    isLoading,
    payload,
    setPayload,
    dialogVisible,
    setDialogVisible,
    setDialogTitle,
    setDialogMessage,
    dialogTitle,
    dialogMessage,
  } = useDataContext();

  // const {  } = WithRequest();
  // const {  } = WithoutRequest();

  return (
    <PaperProvider>
      {isLoading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      )}
      <View style={defaultStyles.container}>Clean</View>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => {
            setDialogVisible(false);
            setDialogTitle("");
            setDialogMessage("");
          }}
        >
          <Dialog.Title>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
}
