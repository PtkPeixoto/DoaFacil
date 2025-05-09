import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";

import defaultStyles from "../../../assets/styles";
import {
  Provider as PaperProvider,
  Dialog,
  Portal,
  Button,
  ActivityIndicator,
  Icon,
} from "react-native-paper";

import { useDataContext } from "../provider/index";
import WithRequest from "../functions/withRequest";
import WithoutRequest from "../functions/withoutRequest";
import { useFocusEffect } from "@react-navigation/native";
import { useGlobalContext } from "../../Provider/GlobalProvider";
import { ScrollView } from "react-native-gesture-handler";

export default function Content() {
  const {
    payload,
    setPayload,
    donations,
    companies,
    rescues,
    showModal,
    setShowModal,
    modalDetails,
    setModalDetails,
    modalActions,
    setModalActions,
  } = useDataContext();

  const {user} = useGlobalContext();

  const { getCompanies, getDonate, getDonates, getRescues, getUser, requestRescue, effectiveRescue } = WithRequest();
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

  const pressDonation = async (donationId: string, onlyView: boolean = false ) => {
    const donate = donations.find((donate) => {
      return String(donate.id) === String(donationId)
    });
    
    if (!donate) {
    return;
    }
    const user = await getUser(donate.user_id);
    if(!user){
      return;
    }

    setModalDetails({
      title: "Detalhes da doação",
      message: `Nome: ${user.name}\nEmail: ${user.email}\nTelefone: ${user.phone}\nEndereço: ${user.address}, ${user.city} - ${user.state}`,
    });
    setShowModal(true);
    
    if (onlyView) {
      setModalActions(null);
      return;
    }

    setModalActions([
      {
        title: "Solicitar Retirada",
        action: () => {pressRescue(donationId)},
      },
      {
        title: "Cancelar",
        action: () => {}
      },
    ]);

  };

  const pressRescue = async (donationId: string) => {
    const donate = await getDonate(donationId);
    if (!donate || !user?.id) {
      return;
    }
    
    const reqRescue = await requestRescue(donationId, user.id);
    getRescues();
    getDonates();
  };

  const pressEffectuateRescue = async (rescueId: string) => {
    const rescue = rescues.find((rescue) => {
      return String(rescue.id) === String(rescueId)
    });
    
    if (!rescue) {
      return;
    }

    if(String(rescue.donor_id) !== String(user?.id)){
      setModalDetails({
        title: "Informe o código de resgate",
        message: `${rescue.rescue_token}`,
      });
      setShowModal(true);    
      setModalActions(null);

      return;
    }

    const response = await effectiveRescue(rescueId);
    getRescues();
  }


  return (
    <ScrollView>
    <View style={defaultStyles.container}>
      {donations.length > 0 && (
        <>
          <View style={{ marginBottom: 20 }}>
            <View style={defaultStyles.header}>
              <Text style={defaultStyles.title}>Doações Disponíveis</Text>
            </View>

            {donations.map((donation) => (
              <View key={donation.id} style={{ ...defaultStyles.donationCard }}>
                <View>
                  <Text style={defaultStyles.donationName}>
                    {donation.name}
                  </Text>
                  <Text style={defaultStyles.donationDetails}>
                    <Text style={defaultStyles.donationDetailsTextDestac}>
                      Descrição:
                    </Text>{" "}
                    {donation.description}
                  </Text>
                  <Text style={defaultStyles.donationDetails}>
                    <Text style={defaultStyles.donationDetailsTextDestac}>
                      Quantidade:
                    </Text>{" "}
                    {donation.quantity}
                  </Text>
                </View>
                <View style={defaultStyles.donationActions}>
                  <Pressable
                    style={defaultStyles.donationActionButton}
                    onPress={() => {
                      pressDonation(donation.id);
                    }}
                  >
                    <Text style={defaultStyles.donationActionButtonText}>
                      Ver detalhes
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {rescues.length > 0 && (
        <>
          <View style={{ marginBottom: 20 }}>
            <View style={defaultStyles.header}>
              <Text style={defaultStyles.title}>Resgates</Text>
            </View>

            {rescues.map((rescue) => (
              <View key={rescue.id} style={{ ...defaultStyles.donationCard }}>
                <View>
                  <Text style={defaultStyles.donationName}>
                    {rescue.donation_name}
                  </Text>
                  <Text style={defaultStyles.donationDetails}>
                    <Text style={defaultStyles.donationDetailsTextDestac}>
                      Quantidade:
                    </Text>{" "}
                    {rescue.rescued_quantity}
                  </Text>
                  <Text style={defaultStyles.donationDetails}>
                    <Text style={defaultStyles.donationDetailsTextDestac}>
                      Código de resgate:
                    </Text>{" "}
                    {rescue.rescue_token}
                  </Text>
                </View>
                <View style={defaultStyles.donationActions}>
                  <Pressable
                    style={defaultStyles.donationActionButton}
                    onPress={() => {
                      pressDonation(rescue.donation_id, true);
                    }}
                  >
                    <Text style={defaultStyles.donationActionButtonText}>
                      Ver detalhes
                    </Text>
                  </Pressable>

                  <Pressable
                    style={defaultStyles.donationActionButton}
                    onPress={() => {
                      pressEffectuateRescue(rescue.id);
                    }}
                  >
                    <Text style={defaultStyles.donationActionButtonText}>
                      Efetivar Resgate
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {companies.length > 0 && (
        <>
          <View style={{ marginBottom: 20 }}>
            <View style={defaultStyles.header}>
              <Text style={defaultStyles.title}>
                Últimas empresas cadastradas
              </Text>
            </View>
            {companies.map((company) => (
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

                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon source="chevron-up" size={20} />
                    </View>
                  </>
                )}
                {!showDetails.includes(company.id) && (
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon source="chevron-down" size={20} />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </>
      )}

      <Portal>
        <Dialog visible={showModal} onDismiss={() => setShowModal(false)}>
          <Dialog.Title>{modalDetails?.title}</Dialog.Title>
          <Dialog.Content>
            <Text>{modalDetails?.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            {modalActions && (
              <View style={{ display: "flex", flexDirection: "row" }}>
                {modalActions.map((action, index) => (
                  <Button
                    key={index}
                    onPress={() => {
                      action.action();
                      setShowModal(false);
                    }}
                  >
                    {action.title}
                  </Button>
                ))}
              </View>
            )}
            {!modalActions && (<Button onPress={() => setShowModal(false)}>OK</Button>)}
            
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
    </ScrollView>
  );
}
