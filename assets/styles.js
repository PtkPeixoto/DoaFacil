import { StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
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
    borderRadius: 5,
    marginTop: 20,
    textDecorationLine: "none",
  },
  buttonCreate: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    height: 50,
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
  companyCard:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
  },
  companyName:{
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  companyDetails:{
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  companyDetailsTextDestac:{
    fontWeight: "bold",
  },
  companyCardButton:{
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 10,
    textDecorationLine: "none",
  },
});

export default defaultStyles;
