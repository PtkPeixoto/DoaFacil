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
import { consultaCep, consultaCNPJ } from "./functions";
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
      key: "zipCode",
      label: "Cep",
      placeholder: `Cep`,
      keyboardType: "numeric",
    },
    {
      key: "username",
      label: "Usuário",
      placeholder: `Usuário`,
      keyboardType: "default",
    },
    {
      key: "password",
      label: "Senha",
      placeholder: `Senha`,
      keyboardType: "default",
      secureTextEntry: true,
    },
    {
      key: "confirm_password",
      label: "Confirmação de Senha",
      placeholder: `Confirmação de Senha`,
      keyboardType: "default",
      secureTextEntry: true,
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
  // Campos adicionais para retirada
  const [fieldsRetirada, setFieldsRetirada] = React.useState<IField[]>([
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
  ]);
  // Campos adicionais para doação
  const [fieldsDoacao, setFieldsDoacao] = React.useState<IField[]>([
    {
      key: "CNPJ",
      label: "CNPJ",
      placeholder: "CNPJ",
      keyboardType: "default",
    },
    {
      key: "fantasyName",
      label: "Nome Fantasia",
      placeholder: "Nome Fantasia",
      keyboardType: "default",
    },
    {
      key: "companyName",
      label: "Razão Social",
      placeholder: "Razão Social",
      keyboardType: "default",
    },
  ]);

  const [payload, setPayload] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    CNPJ: "19131243000197",
    fantasyName: "",
    companyName: "",
  });

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [loadingFieldsCep, setLoadingFieldsCep] = React.useState(false);
  const [loadingFieldsCNPJ, setLoadingFieldsCNPJ] = React.useState(false);

  const handleCep = async () => {
    if (payload.zipCode.length < 8) return;
    setPayload({
      ...payload,
      address: "",
      neighborhood: "",
      city: "",
      state: "",
    });

    setLoadingFieldsCep(true);

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

    setLoadingFieldsCep(false);
  };

  const handleCNPJ = async () => {
    if (payload.CNPJ.length < 8) return;
    setPayload({
      ...payload,
      fantasyName: "",
      companyName: "",
    });

    setLoadingFieldsCNPJ(true);

    const response = await consultaCNPJ(payload.CNPJ);
    if (response) {
      setPayload({
        ...payload,
        fantasyName: response.nome_fantasia,
        companyName: response.razao_social,
      });
    } else {
      setDialogMessage("CNPJ não encontrado");
      setDialogVisible(true);
    }

    setLoadingFieldsCNPJ(false);
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
          data={
            selectedType === "doacao"
              ? [...fieldsDoacao, ...fields]
              : [...fieldsRetirada, ...fields]
          }
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View>
              <Text>{item.label}</Text>
              <View style={defaultStyles.inputContainer}>
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

                    if (item.key === "CNPJ") {
                      handleCNPJ();
                    }
                  }}
                  value={payload[item.key]}
                />
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
