import React from "react";
import { View, Text, TextInput } from "react-native";

import defaultStyles from "../../../assets/styles";

import { useDataContext } from "../provider/index";
import WithRequest from "../functions/withRequest";
import WithoutRequest from "../functions/withoutRequest";
import { useGlobalContext } from "../../Provider/GlobalProvider";
import { Button } from "react-native-paper";

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

  return (
    <View style={defaultStyles.container}>
      <View>
        <Text>Acesso</Text>
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

        <Button
          style={{ ...defaultStyles.button }}
          onPress={()=>{handleLogin()}}
        >
          <Text style={defaultStyles.buttonText}>Acessar</Text>
        </Button>
      </View>
    </View>
  );
}
