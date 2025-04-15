import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#f0f9ff",
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    header: {
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 32,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: "#0369a1",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: "#64748b",
      textAlign: "center",
    },
    formContainer: {
      marginBottom: 24,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    inputIcon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      height: 56,
      fontSize: 16,
      color: "#1e293b",
    },
    buttonGroup: {
      marginTop: 8,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    saveButton: {
      backgroundColor: "#0284c7",
    },
    historyButton: {
      backgroundColor: "#4b5563",
    },
    cancelButton: {
      backgroundColor: "#64748b",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
  });
  export default styles;