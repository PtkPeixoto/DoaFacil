import React from "react";
import { View, Text, FlatList, TextInput } from "react-native";

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
import { TextInputMask } from "react-native-masked-text";
import { useFocusEffect } from "@react-navigation/native";

export default function Content() {
  const { payload, setPayload, fields } = useDataContext();

  const {
    isLoading,
    dialogVisible,
    setDialogVisible,
    setDialogTitle,
    setDialogMessage,
    dialogTitle,
    dialogMessage,
    user,
  } = useGlobalContext();

  const { handleCreate } = WithRequest();
  // const {  } = WithoutRequest();

  useFocusEffect(
    React.useCallback(() => {
      setPayload({ ...payload, user_id: user?.id });
    }, [user])
  );

  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.header}>
        <Text style={defaultStyles.title}>Criar Doação</Text>
      </View>
      <FlatList
        data={fields}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <Text>{item.label}</Text>
            <View style={defaultStyles.inputContainer}>
              {item.masked ? (
                <TextInputMask
                  type={item.maskType}
                  options={item.maskOptions}
                  placeholder={item.placeholder}
                  keyboardType={item.keyboardType || "default"}
                  secureTextEntry={item.secureTextEntry || false}
                  style={defaultStyles.input}
                  onChangeText={(text) => {
                    setPayload({ ...payload, [item.key]: text });
                  }}
                  value={payload[item.key as keyof typeof payload] as string}
                />
              ) : (
                <TextInput
                  placeholder={item.placeholder}
                  keyboardType={item.keyboardType || "default"}
                  secureTextEntry={item.secureTextEntry || false}
                  style={defaultStyles.input}
                  onChangeText={(text) => {
                    setPayload({ ...payload, [item.key]: text });
                  }}
                  value={payload[item.key as keyof typeof payload] as string}
                  passwordRules={
                    ["password", "password_confirmation"].includes(item.key)
                      ? "required: upper; required: lower; required: digit; minlength: 8; max-consecutive: 2;"
                      : undefined
                  }
                />
              )}
            </View>
          </View>
        )}
      />
      <Button
        onPress={handleCreate}
        style={{ ...defaultStyles.button, ...defaultStyles.buttonCreate }}
      >
        <Text style={defaultStyles.buttonText}>Cadastrar</Text>
      </Button>
    </View>
  );
}
