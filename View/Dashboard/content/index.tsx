import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";

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
import { useFocusEffect } from "@react-navigation/native";

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

  const { getCompanies, getDonates, getRescues } = WithRequest();
  // const {  } = WithoutRequest();

  const [showDetails, setShowDetails] = React.useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      getCompanies();
      getDonates();
      getRescues();
    }, [])
  );

  const pressCompany = (companyId: string) => {
    if (showDetails.includes(companyId)) {
      setShowDetails([...showDetails.filter((item) => item !== companyId)]);
      return;
    }
    setShowDetails([...showDetails, companyId]);
  };

  return (
    <PaperProvider>
      {isLoading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      )}
      <View style={defaultStyles.container}>
        {payload.donations.length > 0 && (
          <>
            <View style={{ marginBottom: 20 }}>
              <Text>Resgates Pendentes</Text>
            </View>
          </>
        )}

        {payload.rescues.length > 0 && (
          <>
            <View style={{ marginBottom: 20 }}>
              <Text>Doações</Text>
            </View>
          </>
        )}

        {payload.companies.length > 0 && (
          <>
            <View style={{ marginBottom: 20 }}>
              <Text>Últimas empresas cadastradas</Text>
              {payload.companies.map((company) => (
                <Pressable
                  key={company.id}
                  style={{ ...defaultStyles.companyCard }}
                  onPress={() => {
                    pressCompany(company.id);
                  }}
                >
                  <Text style={defaultStyles.companyName}>{company.name}</Text>
                  <Text style={defaultStyles.companyDetails}>
                    <Text style={defaultStyles.companyDetailsTextDestac}>
                      CNPJ:
                    </Text>{" "}
                    {company.cnpj}
                  </Text>
                  <Text style={defaultStyles.companyDetails}>
                    <Text style={defaultStyles.companyDetailsTextDestac}>
                      Endereço:
                    </Text>{" "}
                    {company.address}, {company.city} - {company.state}
                  </Text>
                  {showDetails.includes(company.id) && (
                    <>
                      <Text style={defaultStyles.companyDetails}>
                        <Text style={defaultStyles.companyDetailsTextDestac}>
                          Telefone:
                        </Text>{" "}
                        {company.phone}
                      </Text>
                      <Text style={defaultStyles.companyDetails}>
                        <Text style={defaultStyles.companyDetailsTextDestac}>
                          Email:
                        </Text>{" "}
                        {company.email}
                      </Text>
                    </>
                  )}
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>

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
