  import { StyleSheet } from "react-native";


  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor:"#EEE5DE",
    },
    input: {
      borderWidth: 0,
      opacity: 0.91,
      marginVertical: 10,
      padding: 12,
      borderRadius: 8,
      fontSize: 18,
      backgroundColor: "FAF2EA",
    },
      phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    opacity: 0.91,
    marginVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FAF2EA",
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
    color: "#000",
  },
    image: {
      width: 319,
      height: 319,
      borderRadius: 75,
      resizeMode: "contain",
      alignSelf: "center",
    },
    text: {
      marginTop: 12,
      fontSize: 18,
      color: '#555',
      textAlign: "center"
    },
    continue_button: {
      marginTop: 12,
      backgroundColor: '#EEA46D',
      borderRadius: 8,
      paddingVertical: 0,
      paddingHorizontal: 16,
      width: 327,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    google_button: {
      flexDirection: "row",
    },
    continue_text:{
      padding: 12,
      textAlign: "center",
      fontSize: 16, 
      color: '#FFFFFF'
    },
    continue_google_text:{
      padding: 12,
      textAlign: "center",
      fontSize: 14, 
      color: '#000000'
    },
    google_icon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    orContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    orLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#C4C4C4",
    },
    orText: {
      marginHorizontal: 10,
      fontSize: 14,
      color: "#777",
    },
    box: {
    width: "100%",
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: '#FAF2EA',
    paddingHorizontal: 24,
    marginTop: 20,
  },

  termsText: {
    textAlign: "center",
    color: "#000",
    marginTop: 12,
    fontSize: 12,
  },

  linkText: {
    fontWeight: "bold",
  }
  });
