import React from "react";
import { View, Text, TextInput } from "react-native";

import defaultStyles from "../../../assets/styles";

import { useDataContext } from "../provider/index";
import WithRequest from "../functions/withRequest";
import WithoutRequest from "../functions/withoutRequest";
import { useGlobalContext } from "../../Provider/GlobalProvider";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Types/routes";

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

  const {handleLogin} = WithRequest();
  // const {  } = WithoutRequest();
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Cadastro"
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={defaultStyles.container}>
      <View>
        <View>
          <Text>Email</Text>
          <View style={defaultStyles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={payload.email}
              onChangeText={(text) => setPayload({ ...payload, email: text })}
              style={defaultStyles.input}
            />
          </View>
        </View>

        <View>
          <Text>Senha</Text>
          <View style={defaultStyles.inputContainer}>
            <TextInput
              placeholder="Senha"
              value={payload.password}
              onChangeText={(text) =>
                setPayload({ ...payload, password: text })
              }
              style={defaultStyles.input}
              passwordRules="required: upper; required: lower; required: digit; minlength: 8; max-consecutive: 2;"
              secureTextEntry={true}
            />
          </View>
        </View>
        
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          style={{ ...defaultStyles.button, backgroundColor: "gray" }}
          onPress={()=>{
            navigation.navigate("Cadastro");   
          }}
        >
          <Text style={defaultStyles.buttonText}>Novo Cadastro</Text>
        </Button>

        <Button
          style={{ ...defaultStyles.button }}
          onPress={()=>{handleLogin()}}
        >
          <Text style={defaultStyles.buttonText}>Acessar</Text>
        </Button>
        </View>
        
      </View>
    </View>
  );
}
