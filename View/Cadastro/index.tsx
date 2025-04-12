import React from "react";
import { View, Text } from "react-native";

import defaultStyles from "../../assets/styles";
import DropDownPicker from "react-native-dropdown-picker";
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  Provider as PaperProvider,
  Dialog,
  Portal,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { consultaCep } from "./functions";
import { IField } from "../../Types/fields";

export default function Cadastro() {
  const [typeIsOpen, setTypeIsOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState(null);
  const [types, setTypes] = React.useState([
    { id: 1, label: "Doação", value: "doacao" },
    { id: 2, label: "Retirada", value: "retirada" },
  ]);
  const [fields, setFields] = React.useState<IField[]>([
    {
      key: "name",
      label: "Nome",
      placeholder: `${
        selectedType === "doacao" ? "Nome do doador" : "Nome do retirante"
      }`,
      keyboardType: "default",
    },
    {
      key: "email",
      label: "Email",
      placeholder: `${
        selectedType === "doacao" ? "Email do doador" : "Email do retirante"
      }`,
      keyboardType: "email-address",
    },
    {
      key: "phone",
      label: "Telefone",
      placeholder: `${
        selectedType === "doacao"
          ? "Telefone do doador"
          : "Telefone do retirante"
      }`,
      keyboardType: "phone-pad",
    },
    {
      key: "zipCode",
      label: "Cep",
      placeholder: `Cep`,
      keyboardType: "numeric",
    },
    {
      key: "address",
      label: "Endereço",
      placeholder: `Endereço`,
    },
    {
      key: "neighborhood",
      label: "Bairro",
      placeholder: `Bairro`,
    },
    {
      key: "city",
      label: "Cidade",
      placeholder: `Cidade`,
    },
    {
      key: "state",
      label: "Estado",
      placeholder: `Estado`,
    },
  ]);

  const [payload, setPayload] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [loadingFields, setLoadingFields] = React.useState(false);

  const handleCep = async () => {
    if (payload.zipCode.length < 8) return;
    setPayload({
      ...payload,
      address: "",
      neighborhood: "",
      city: "",
      state: "",
    });

    setLoadingFields(true);

    const response = await consultaCep(payload.zipCode);
    if (response) {
      setPayload({
        ...payload,
        address: response.street,
        neighborhood: response.neighborhood,
        city: response.city,
        state: response.state,
      });
    } else {
      setDialogMessage("CEP não encontrado");
      setDialogVisible(true);
    }

    setLoadingFields(false);
  };

  return (
    <PaperProvider>
      <View style={defaultStyles.container}>
        <View>
          <Text>Tipo</Text>
          <DropDownPicker
            open={typeIsOpen}
            value={selectedType}
            items={types}
            setOpen={setTypeIsOpen}
            setValue={setSelectedType}
            setItems={setTypes}
            placeholder="Selecione um tipo"
            style={defaultStyles.dropDownList}
            dropDownContainerStyle={defaultStyles.dropDownListContainer}
          />
        </View>

        <FlatList
          data={fields}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View>
              <Text>{item.label}</Text>
              <View style={defaultStyles.inputContainer}>
                <TextInput
                  placeholder={item.placeholder}
                  keyboardType={item.keyboardType || "default"}
                  style={defaultStyles.input}
                  onChangeText={(text) => {
                    setPayload({ ...payload, [item.key]: text });
                  }}
                  onBlur={() => {
                    if (item.key === "zipCode") {
                      handleCep();
                    }
                  }}
                  value={payload[item.key]}
                />
                {loadingFields &&
                  ["address", "neighborhood", "city", "state"].includes(
                    item.key
                  ) && <ActivityIndicator size="small" color="gray" style={defaultStyles.loadingIndicator} />}
              </View>
            </View>
          )}
        />
      </View>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>Aviso</Dialog.Title>
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
