import React from "react";
import { View, Text } from "react-native";

import defaultStyles from "../../../assets/styles";
import DropDownPicker from "react-native-dropdown-picker";
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  Provider as PaperProvider,
  Dialog,
  Portal,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";

import { useCadastroContext } from "../provider/index";
import WithRequest from "../functions/withRequest";
import WithoutRequest from "../functions/withoutRequest";

export default function Content() {
  const {
    isLoading,
    payload,
    setPayload,
    typeIsOpen,
    selectedType,
    types,
    setTypeIsOpen,
    setSelectedType,
    setTypes,
    fields,
    fieldsCompany,
    fieldsUser,
    loadingFieldsCep,
    loadingFieldsCNPJ,
    dialogVisible,
    setDialogVisible,
    dialogTitle,
    dialogMessage,
  } = useCadastroContext();
  const { handleCreate } = WithRequest();
  const { handleCep, handleCNPJ } = WithoutRequest();

  return (
    <PaperProvider>
      {isLoading && (
      <View style={defaultStyles.loadingOverlay}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    )}
      <View style={defaultStyles.container}>
        <View>
          <Text>Tipo</Text>
          <DropDownPicker
            open={typeIsOpen}
            value={selectedType}
            items={types}
            setOpen={setTypeIsOpen}
            setValue={(val)=>{setSelectedType(val); setPayload({...payload, user_type: val as unknown as string})}}
            setItems={setTypes}
            placeholder="Selecione um tipo"
            style={defaultStyles.dropDownList}
            dropDownContainerStyle={defaultStyles.dropDownListContainer}
          />
        </View>

        <FlatList
          data={
            selectedType === "company"
              ? [...fieldsCompany, ...fields]
              : [...fieldsUser, ...fields]
          }
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View>
              <Text>{item.label}</Text>
              <View style={defaultStyles.inputContainer}>
                {item.key === "phone" ||
                item.key === "CNPJ" ||
                item.key === "zipCode" ? (
                  <TextInputMask
                    type={
                      item.key === "phone"
                        ? "cel-phone"
                        : item.key === "CNPJ"
                        ? "cnpj"
                        : "zip-code"
                    }
                    options={
                      item.key === "phone"
                        ? {
                            maskType: "BRL",
                            withDDD: true,
                            dddMask: "(99) ",
                          }
                        : undefined
                    }
                    placeholder={item.placeholder}
                    keyboardType={item.keyboardType || "default"}
                    secureTextEntry={item.secureTextEntry || false}
                    style={defaultStyles.input}
                    onChangeText={(text) => {
                      setPayload({ ...payload, [item.key]: text });
                    }}
                    onBlur={() => {
                      if (item.key === "zipCode") {
                        handleCep();
                      }

                      if (item.key === "CNPJ") {
                        handleCNPJ();
                      }
                    }}
                    value={payload[item.key]}
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
                    onBlur={() => {
                      if (item.key === "zipCode") {
                        handleCep();
                      }
                    }}
                    value={payload[item.key as keyof typeof payload]}
                  />
                )}
                {loadingFieldsCep &&
                  ["address", "neighborhood", "city", "state"].includes(
                    item.key
                  ) && (
                    <ActivityIndicator
                      size="small"
                      color="gray"
                      style={defaultStyles.loadingIndicator}
                    />
                  )}

                {loadingFieldsCNPJ &&
                  ["fantasyName", "companyName"].includes(item.key) && (
                    <ActivityIndicator
                      size="small"
                      color="gray"
                      style={defaultStyles.loadingIndicator}
                    />
                  )}
              </View>
            </View>
          )}
        />

        <Button onPress={handleCreate} style={{ ...defaultStyles.button, ...defaultStyles.buttonCreate }}><Text style={defaultStyles.buttonText}>Cadastrar</Text></Button>
      </View>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
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
