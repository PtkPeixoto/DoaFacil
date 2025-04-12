import { StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    padding: 20,

    flex: 1,
    backgroundColor: "#fff",
    alignItems: "start",
    justifyContent: "start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  dropDownList: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
  },
  dropDownListContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default defaultStyles;
