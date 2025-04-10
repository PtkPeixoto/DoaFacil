import { StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
});

export default defaultStyles;